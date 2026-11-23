import type { Cargo } from "../types"
import { money } from "../utils/money"
import { card } from "./styles"

export default function TarjetaCuotas({ cargos }: { cargos: Cargo[] }) {
  const cuotas = cargos.filter(cargo => !cargo.anulado && cargo.saldo > 0)
  return (
        <section className={card}>
          <h2 className="mb-6 font-heading text-xl font-bold">Detalle del saldo</h2>
          {cuotas.length ? cuotas.map(cargo => <p key={cargo.id} className="flex justify-between gap-4 border-t border-slate-200 py-4 text-sm"><span>{cargo.periodo} · {cargo.numero}</span><strong>{money(cargo.saldo)}</strong></p>) : <p className="border-t border-slate-200 pt-4 text-sm text-slate-600">No tienes cargos pendientes.</p>}
        </section>
  )
}
