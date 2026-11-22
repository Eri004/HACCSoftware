import { useState } from "react"
import type { Cargo, Condo, Payment, User, View } from "./types"
import { readLocal, writeLocal } from "./utils/storage"
import { api } from "./services/api"
import AppHeader from "./components/AppHeader"
import Welcome from "./components/Welcome"
import CreateCondo from "./components/CreateCondo"
import Dashboard from "./components/Dashboard"
import Account from "./components/Account"
import PaymentForm from "./components/PaymentForm"
import PaymentSuccess from "./components/PaymentSuccess"

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [adminView, setAdminView] = useState<View>("welcome")
  const [residentView, setResidentView] = useState<View>("welcome")
  const [condo, setCondo] = useState<Condo>(() => readLocal("hacc-condo", { name: "", address: "", city: "", units: "", email: "", ruc: "" }))
  const [cargosResidente, setCargosResidente] = useState<Cargo[]>([])
  const [pagosResidente, setPagosResidente] = useState<Payment[]>([])
  const [payment, setPayment] = useState<Payment | null>(null)
  const [storageError, setStorageError] = useState("")

  const role = user?.role ?? null
  const view = !user ? "welcome" : user.role === "admin" ? adminView : residentView
  const go = user?.role === "admin" ? setAdminView : setResidentView
  const cargoPendiente = cargosResidente.find(cargo => !cargo.anulado && cargo.saldo > 0)

  async function login(username: string, password: string) {
    const loggedUser = await api.login(username, password)
    let residentCharges: Cargo[] = []
    let residentPayments: Payment[] = []
    if (loggedUser.role === "resident") {
      if (!loggedUser.personaId) throw new Error("La cuenta no tiene un residente asignado.")
      const residentData = await Promise.all([
        api.getCargos(loggedUser.personaId),
        api.getPagos(loggedUser.personaId),
      ])
      residentCharges = residentData[0]
      residentPayments = residentData[1]
    }
    setUser(loggedUser)
    setCargosResidente(residentCharges)
    setPagosResidente(residentPayments)
    setPayment(residentPayments[0] ?? null)
    setAdminView("dashboard")
    setResidentView(residentCharges.some(cargo => cargo.saldo > 0) ? "debt" : "current")
  }

  function logout() {
    setUser(null)
    setAdminView("welcome")
    setResidentView("welcome")
    setCargosResidente([])
    setPagosResidente([])
    setPayment(null)
    setStorageError("")
  }

  function home() {
    if (user?.role === "admin") setAdminView("dashboard")
    else if (user?.role === "resident") setResidentView(cargosResidente.some(cargo => cargo.saldo > 0) ? "debt" : "current")
  }

  function saveCondo(value: Condo) {
    setCondo(value)
    const saved = writeLocal("hacc-condo", value)
    setStorageError(saved ? "" : "No se pudo guardar en este navegador. Los datos se mantendrán solo mientras la página siga abierta.")
    go("dashboard")
  }

  async function savePayment(value: { method: string; reference: string; file: string }) {
    if (!user?.personaId || !user.unidadId || !cargoPendiente) throw new Error("No se encontró un cargo pendiente para esta cuenta.")
    const result = await api.registerPayment({
      unidadId: user.unidadId,
      personaId: user.personaId,
      cargoId: cargoPendiente.id,
      monto: cargoPendiente.saldo,
      formaPago: value.method,
      referencia: value.reference,
      comprobanteNombre: value.file,
    })
    const savedPayment: Payment = { ...result, comprobanteNombre: value.file }
    const [newCharges, newPayments] = await Promise.all([
      api.getCargos(user.personaId),
      api.getPagos(user.personaId),
    ])
    setPayment(savedPayment)
    setCargosResidente(newCharges)
    setPagosResidente(newPayments)
    setResidentView("success")
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas font-body text-navy">
      <AppHeader role={role} onLogout={logout} onHome={home} />
      <main className={view === "welcome" ? "w-full" : "mx-auto min-h-[calc(100dvh-93px)] max-w-6xl px-5 py-10 md:px-10 md:py-14"}>
        {storageError && <p role="alert" className="mb-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{storageError}</p>}
        {view === "welcome" && <Welcome onLogin={login} />}
        {view === "create" && <CreateCondo condo={condo} back={() => go("dashboard")} save={saveCondo} />}
        {view === "dashboard" && <Dashboard condo={condo} onCreate={() => go("create")} />}
        {(view === "debt" || view === "current") && user && <Account user={user} cargos={cargosResidente} payments={pagosResidente} payment={payment} pay={() => go("payment")} detail={() => go("success")} />}
        {view === "payment" && cargoPendiente && <PaymentForm cargo={cargoPendiente} back={() => go("debt")} submit={savePayment} />}
        {view === "success" && payment && <PaymentSuccess payment={payment} next={() => go("current")} />}
      </main>
    </div>
  )
}
