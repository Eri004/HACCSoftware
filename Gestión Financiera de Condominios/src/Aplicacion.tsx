import { useState } from "react"
import type { Cargo, Condo, Payment, User, View } from "./types"
import { readLocal, writeLocal } from "./utils/storage"
import { api } from "./services/api"
import EncabezadoAplicacion from "./components/EncabezadoAplicacion"
import Bienvenida from "./components/Bienvenida"
import CrearCondominio from "./components/CrearCondominio"
import PanelControl from "./components/PanelControl"
import Cuenta from "./components/Cuenta"
import FormularioPago from "./components/FormularioPago"
import PagoExitoso from "./components/PagoExitoso"

export default function Aplicacion() {
  const [usuario, establecerUsuario] = useState<User | null>(null)
  const [vistaAdmin, establecerVistaAdmin] = useState<View>("welcome")
  const [vistaResidente, establecerVistaResidente] = useState<View>("welcome")
  const [condominio, establecerCondominio] = useState<Condo>(() => readLocal("hacc-condo", { name: "", address: "", city: "", units: "", email: "", ruc: "" }))
  const [cargosResidente, establecerCargosResidente] = useState<Cargo[]>([])
  const [pagosResidente, establecerPagosResidente] = useState<Payment[]>([])
  const [pago, establecerPago] = useState<Payment | null>(null)
  const [errorAlmacenamiento, establecerErrorAlmacenamiento] = useState("")

  const rol = usuario?.role ?? null
  const vista = !usuario ? "welcome" : usuario.role === "admin" ? vistaAdmin : vistaResidente
  const irA = usuario?.role === "admin" ? establecerVistaAdmin : establecerVistaResidente
  const cargoPendiente = cargosResidente.find(cargo => !cargo.anulado && cargo.saldo > 0)

  async function iniciarSesion(nombreUsuario: string, contrasena: string) {
    const usuarioAutenticado = await api.login(nombreUsuario, contrasena)
    let cargosResidente: Cargo[] = []
    let pagosResidente: Payment[] = []
    if (usuarioAutenticado.role === "resident") {
      if (!usuarioAutenticado.personaId) throw new Error("La cuenta no tiene un residente asignado.")
      const datosResidente = await Promise.all([
        api.getCargos(usuarioAutenticado.personaId),
        api.getPagos(usuarioAutenticado.personaId),
      ])
      cargosResidente = datosResidente[0]
      pagosResidente = datosResidente[1]
    }
    establecerUsuario(usuarioAutenticado)
    establecerCargosResidente(cargosResidente)
    establecerPagosResidente(pagosResidente)
    establecerPago(pagosResidente[0] ?? null)
    establecerVistaAdmin("dashboard")
    establecerVistaResidente(cargosResidente.some(cargo => cargo.saldo > 0) ? "debt" : "current")
  }

  function cerrarSesion() {
    establecerUsuario(null)
    establecerVistaAdmin("welcome")
    establecerVistaResidente("welcome")
    establecerCargosResidente([])
    establecerPagosResidente([])
    establecerPago(null)
    establecerErrorAlmacenamiento("")
  }

  function irInicio() {
    if (usuario?.role === "admin") establecerVistaAdmin("dashboard")
    else if (usuario?.role === "resident") establecerVistaResidente(cargosResidente.some(cargo => cargo.saldo > 0) ? "debt" : "current")
  }

  function guardarCondominio(valor: Condo) {
    establecerCondominio(valor)
    const guardado = writeLocal("hacc-condo", valor)
    establecerErrorAlmacenamiento(guardado ? "" : "No se pudo guardar en este navegador. Los datos se mantendrán solo mientras la página siga abierta.")
    irA("dashboard")
  }

  async function guardarPago(valor: { metodo: string; referencia: string; archivo: string }) {
    if (!usuario?.personaId || !usuario.unidadId || !cargoPendiente) throw new Error("No se encontró un cargo pendiente para esta cuenta.")
    const resultado = await api.registerPayment({
      unidadId: usuario.unidadId,
      personaId: usuario.personaId,
      cargoId: cargoPendiente.id,
      monto: cargoPendiente.saldo,
      formaPago: valor.metodo,
      referencia: valor.referencia,
      comprobanteNombre: valor.archivo,
    })
    const pagoGuardado: Payment = { ...resultado, comprobanteNombre: valor.archivo }
    const [nuevosCargos, nuevosPagos] = await Promise.all([
      api.getCargos(usuario.personaId),
      api.getPagos(usuario.personaId),
    ])
    establecerPago(pagoGuardado)
    establecerCargosResidente(nuevosCargos)
    establecerPagosResidente(nuevosPagos)
    establecerVistaResidente("success")
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas font-body text-navy">
      <EncabezadoAplicacion rol={rol} alCerrarSesion={cerrarSesion} alInicio={irInicio} />
      <main className={vista === "welcome" ? "w-full" : "mx-auto min-h-[calc(100dvh-93px)] max-w-6xl px-5 py-10 md:px-10 md:py-14"}>
        {errorAlmacenamiento && <p role="alert" className="mb-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{errorAlmacenamiento}</p>}
        {vista === "welcome" && <Bienvenida alIniciarSesion={iniciarSesion} />}
        {vista === "create" && <CrearCondominio condominio={condominio} volver={() => irA("dashboard")} guardar={guardarCondominio} />}
        {vista === "dashboard" && <PanelControl condominio={condominio} alCrear={() => irA("create")} />}
        {(vista === "debt" || vista === "current") && usuario && <Cuenta usuario={usuario} cargos={cargosResidente} pagos={pagosResidente} pago={pago} pagar={() => irA("payment")} detalle={() => irA("success")} />}
        {vista === "payment" && cargoPendiente && <FormularioPago cargo={cargoPendiente} volver={() => irA("debt")} enviar={guardarPago} />}
        {vista === "success" && pago && <PagoExitoso pago={pago} siguiente={() => irA("current")} />}
      </main>
    </div>
  )
}
