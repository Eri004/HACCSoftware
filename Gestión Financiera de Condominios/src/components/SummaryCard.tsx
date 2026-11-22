import { money } from "../utils/money"
import { card } from "./styles"

type SummaryCardProps = {
  label: string
  amount: number
  highlighted?: boolean
}

export default function SummaryCard({ label, amount, highlighted = false }: SummaryCardProps) {
  return (
    <article className={`${card} ${highlighted ? "border-navy bg-navy text-white" : ""}`}>
      <h2 className={`text-sm ${highlighted ? "text-slate-300" : "text-slate-600"}`}>{label}</h2>
      <p className="mt-4 font-heading text-3xl font-extrabold">{money(amount)}</p>
    </article>
  )
}
