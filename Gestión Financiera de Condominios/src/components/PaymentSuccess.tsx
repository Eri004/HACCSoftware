import type { Payment } from "../types"
import { money } from "../utils/money"
import Icon from "./Icon"
import PageTitle from "./PageTitle"
import { button, card } from "./styles"

type PaymentSuccessProps = { payment: Payment; next: () => void }

export default function PaymentSuccess({ payment, next }: PaymentSuccessProps) {
  const details = [
    ["Monto", money(payment.monto)],
    ["Método", payment.formaPago],
    ["Referencia", payment.referencia],
    ["Fecha", new Date(payment.fechaPago).toLocaleString("es-EC")],
  ]
  return (
<section className={`${card} mx-auto max-w-lg text-center`}>
          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-emerald-dark"><Icon name="check" /></span>
          <PageTitle label="Registro confirmado">¡Pago registrado!</PageTitle>
          <dl className="mb-7 space-y-4 text-left text-sm">{details.map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-t border-slate-200 pt-3"><dt className="text-slate-600">{label}</dt><dd className="break-all text-right font-bold">{value}</dd></div>)}</dl>
          <button className={`${button} w-full`} onClick={next}>Ver estado actualizado<Icon name="arrow" /></button>
        </section>
  )
}
