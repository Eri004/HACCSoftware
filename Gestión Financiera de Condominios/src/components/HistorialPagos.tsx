import type { Payment } from "../types"
import { money } from "../utils/money"
import { card } from "./styles"

export default function HistorialPagos({ pagos }: { pagos: Payment[] }) {
  return (
      <section className={`${card} mt-6`}>
        <h2 className="mb-4 font-heading text-xl font-bold">Últimos pagos</h2>
        {pagos.length ? pagos.map(pago => <p key={pago.id} className="flex flex-wrap justify-between gap-3 border-t border-slate-200 py-4 text-sm"><span>{new Date(`${pago.fechaPago}T12:00:00`).toLocaleDateString("es-EC")} · {pago.formaPago}</span><strong>{money(pago.monto)} <span className="ml-4 font-medium text-emerald-dark">Registrado</span></strong></p>) : <p className="border-t border-slate-200 py-4 text-sm text-slate-600">Aún no hay pagos registrados.</p>}
      </section>
  )
}
