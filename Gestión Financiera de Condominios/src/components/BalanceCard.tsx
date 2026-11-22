import type { Payment } from "../types"
import { money } from "../utils/money"
import Icon from "./Icon"
import { button, card } from "./styles"

type BalanceCardProps = { balance: number; payment: Payment | null; pay: () => void; detail: () => void }

export default function BalanceCard({ balance, payment, pay, detail }: BalanceCardProps) {
  const pending = balance > 0
  return (
        <section className={`${card} ${!pending ? "border-emerald/30 bg-mint" : ""}`}>
          <p className={`mb-4 flex items-center gap-2 font-bold ${pending ? "text-amber-800" : "text-emerald-dark"}`}>{pending ? "Pago pendiente" : <><Icon name="check" />Estás al día</>}</p>
          <p className="font-heading text-5xl font-extrabold">{money(balance)}</p>
          {pending && <p className="mt-3 text-slate-600">Saldo pendiente</p>}
          <div className="mt-7">{pending ? <button className={button} onClick={pay}>Registrar pago<Icon name="arrow" /></button> : payment && <button className={button} onClick={detail}>Ver pago registrado</button>}</div>
        </section>
  )
}
