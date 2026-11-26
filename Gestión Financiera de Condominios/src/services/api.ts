import type { Cargo, Condo, Payment, User } from "../types"

const API_URL = "http://localhost:8080/api"

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
    })
  } catch {
    throw new Error(`No se pudo conectar con Quarkus en ${API_URL}. Verifica que el backend esté activo y que CORS permita el origen del frontend.`)
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message || body?.error || `Error del servidor (${response.status})`)
  }
  return response.json() as Promise<T>
}

type ApiCargo = {
  id: number; numeroCargo: string; anio: number; mes: number; fechaVencimiento: string
  total: number; saldo: number; estado: Cargo["estado"]
  unidad: { id: number; bloque: string | null; codigo: string }
  persona: { id: number; nombres: string; apellidos: string }
}
type ApiAlicuota = { unidad: { id: number }; porcentaje: number; cuotaOrdinaria: number; estado: string }
type ApiDetalle = {
  id: number; cargo: { id: number }; tipoConcepto: Cargo["detalles"][number]["tipo"]
  descripcion: string; cantidad: number; valorUnitario: number; subtotal: number
}
type ApiPago = {
  id: number; persona: { id: number }; monto: number; formaPago: string
  referencia: string; fechaPago: string
}
type PagoRequest = {
  unidadId: number; personaId: number; cargoId: number; monto: number
  formaPago: string; referencia: string; comprobanteNombre: string
}
type ApiCondominio = {
  id: number; ruc: string; nombre: string; direccion: string; ciudad: string; emailContacto: string
  diaVencimiento: number; tasaMoraAnual: number; periodoCerradoHasta: string | null; estado: string
}

function mapCondominio(condominio: ApiCondominio, units = ""): Condo {
  return {
    id: condominio.id,
    name: condominio.nombre,
    address: condominio.direccion,
    city: condominio.ciudad,
    units,
    email: condominio.emailContacto,
    ruc: condominio.ruc,
    diaVencimiento: condominio.diaVencimiento,
    tasaMoraAnual: condominio.tasaMoraAnual,
    periodoCerradoHasta: condominio.periodoCerradoHasta,
    estado: condominio.estado,
  }
}

function condominioPayload(condominio: Condo) {
  return {
    ...(condominio.id ? { id: condominio.id } : {}),
    nombre: condominio.name,
    direccion: condominio.address,
    ciudad: condominio.city,
    emailContacto: condominio.email,
    ruc: condominio.ruc,
    diaVencimiento: condominio.diaVencimiento ?? 5,
    tasaMoraAnual: condominio.tasaMoraAnual ?? 0,
    periodoCerradoHasta: condominio.periodoCerradoHasta ?? null,
    estado: condominio.estado ?? "ACTIVO",
  }
}

function periodo(anio: number, mes: number) {
  const label = new Intl.DateTimeFormat("es-EC", { month: "long", year: "numeric" })
    .format(new Date(anio, mes - 1, 1))
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export const api = {
  async getCondominio(): Promise<Condo | null> {
    const [condominios, unidades] = await Promise.all([
      request<ApiCondominio[]>("/condominios"),
      request<{ condominio: { id: number } }[]>("/unidades"),
    ])
    const principal = condominios[0]
    if (!principal) return null
    const totalUnidades = unidades.filter(unidad => unidad.condominio.id === principal.id).length
    return mapCondominio(principal, String(totalUnidades))
  },

  async guardarCondominio(condominio: Condo): Promise<Condo> {
    const path = "/condominios"
    const options: RequestInit = {
      method: condominio.id ? "PUT" : "POST",
      body: JSON.stringify(condominioPayload(condominio)),
    }
    const guardado = await request<ApiCondominio>(path, options)
    const unidades = await request<{ condominio: { id: number } }[]>("/unidades")
    const totalUnidades = unidades.filter(unidad => unidad.condominio.id === guardado.id).length
    return mapCondominio(guardado, String(totalUnidades))
  },

  login(username: string, password: string) {
    return request<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  },

  async getCargos(personaId?: number | null): Promise<Cargo[]> {
    const query = personaId ? `?personaId=${personaId}` : ""
    const [cargos, alicuotas, detalles] = await Promise.all([
      request<ApiCargo[]>(`/cargos${query}`),
      request<ApiAlicuota[]>(`/alicuotas${query}`),
      request<ApiDetalle[]>(`/detalles-cargo${query}`),
    ])
    return cargos.sort((a, b) => b.anio - a.anio || b.mes - a.mes).map(cargo => {
      const alicuota = alicuotas.find(item => item.unidad.id === cargo.unidad.id && item.estado === "ACTIVO")
      const lines = detalles.filter(item => item.cargo.id === cargo.id)
      return {
        id: cargo.id,
        numero: cargo.numeroCargo,
        periodo: periodo(cargo.anio, cargo.mes),
        vencimiento: cargo.fechaVencimiento,
        unidad: { id: cargo.unidad.id, torre: cargo.unidad.bloque || "", codigo: cargo.unidad.codigo },
        residente: { id: cargo.persona.id, nombre: `${cargo.persona.nombres} ${cargo.persona.apellidos}` },
        alicuota: { porcentaje: alicuota?.porcentaje ?? 0, cuotaOrdinaria: alicuota?.cuotaOrdinaria ?? 0 },
        detalles: lines.map(line => ({
          id: line.id,
          tipo: line.tipoConcepto,
          descripcion: line.descripcion,
          cantidad: line.cantidad,
          valorUnitario: line.valorUnitario,
          subtotal: line.subtotal,
        })),
        total: cargo.total,
        saldo: cargo.estado === "ANULADO" ? 0 : cargo.saldo,
        abonado: cargo.total - cargo.saldo,
        estado: cargo.estado,
        anulado: cargo.estado === "ANULADO",
      }
    })
  },

  async getPagos(personaId: number): Promise<Payment[]> {
    const pagos = await request<ApiPago[]>(`/pagos?personaId=${personaId}`)
    return pagos
      .sort((a, b) => new Date(b.fechaPago).getTime() - new Date(a.fechaPago).getTime())
      .map(pago => ({
        id: pago.id,
        monto: pago.monto,
        formaPago: pago.formaPago,
        referencia: pago.referencia,
        fechaPago: pago.fechaPago,
        comprobanteNombre: "",
      }))
  },

  registerPayment(data: PagoRequest) {
    return request<ApiPago>("/pagos/registrar", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}
