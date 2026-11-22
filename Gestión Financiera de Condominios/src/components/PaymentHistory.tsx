import type { Payment } from "../types"
import { money } from "../utils/money"
import { card } from "./styles"

export default function PaymentHistory({ payments }: { payments: Payment[] }) {
  return (
      <section className={`${card} mt-6`}>
        <h2 className="mb-4 font-heading text-xl font-bold">Últimos pagos</h2>
        {payments.length ? payments.map(payment => <p key={payment.id} className="flex flex-wrap justify-between gap-3 border-t border-slate-200 py-4 text-sm"><span>{new Date(`${payment.fechaPago}T12:00:00`).toLocaleDateString("es-EC")} · {payment.formaPago}</span><strong>{money(payment.monto)} <span className="ml-4 font-medium text-emerald-dark">Registrado</span></strong></p>) : <p className="border-t border-slate-200 py-4 text-sm text-slate-600">Aún no hay pagos registrados.</p>}
      </section>
  )
}
