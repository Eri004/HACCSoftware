import type { Payment } from "../types"
import { money } from "../utils/money"
import Icono from "./Icono"
import { button, card } from "./styles"

type TarjetaSaldoProps = { saldo: number; pago: Payment | null; pagar: () => void; detalle: () => void }

export default function TarjetaSaldo({ saldo, pago, pagar, detalle }: TarjetaSaldoProps) {
  const pendiente = saldo > 0
  return (
        <section className={`${card} ${!pendiente ? "border-emerald/30 bg-mint" : ""}`}>
          <p className={`mb-4 flex items-center gap-2 font-bold ${pendiente ? "text-amber-800" : "text-emerald-dark"}`}>{pendiente ? "Pago pendiente" : <><Icono nombre="check" />Estás al día</>}</p>
          <p className="font-heading text-5xl font-extrabold">{money(saldo)}</p>
          {pendiente && <p className="mt-3 text-slate-600">Saldo pendiente</p>}
          <div className="mt-7">{pendiente ? <button className={button} onClick={pagar}>Registrar pago<Icono nombre="arrow" /></button> : pago && <button className={button} onClick={detalle}>Ver pago registrado</button>}</div>
        </section>
  )
}
