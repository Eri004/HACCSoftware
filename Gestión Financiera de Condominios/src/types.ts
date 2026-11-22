export type Role = "admin" | "resident"
export type View = "welcome" | "create" | "dashboard" | "debt" | "payment" | "success" | "current"
export type Condo = { name: string; address: string; city: string; units: string; email: string; ruc: string }
export type User = {
  id: number
  username: string
  role: Role
  personaId: number | null
  personaName: string
  unidadId: number | null
  unidadCodigo: string | null
  bloque: string | null
}
export type Payment = {
  id: number
  monto: number
  formaPago: string
  referencia: string
  fechaPago: string
  comprobanteNombre: string
}

export type DetalleCargo = {
  id: number
  tipo: "ALICUOTA" | "RUBRO" | "INTERES" | "MULTA" | "AJUSTE"
  descripcion: string
  cantidad: number
  valorUnitario: number
  subtotal: number
}

export type Cargo = {
  id: number
  numero: string
  periodo: string
  vencimiento: string
  unidad: { id: number; torre: string; codigo: string }
  residente: { id: number; nombre: string }
  alicuota: { porcentaje: number; cuotaOrdinaria: number }
  detalles: DetalleCargo[]
  total: number
  saldo: number
  abonado: number
  estado: "PENDIENTE" | "PARCIAL" | "PAGADO" | "ANULADO"
  anulado: boolean
}
