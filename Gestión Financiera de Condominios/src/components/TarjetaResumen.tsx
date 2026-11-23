import { money } from "../utils/money"
import { card } from "./styles"

type TarjetaResumenProps = {
  etiqueta: string
  monto: number
  resaltado?: boolean
}

export default function TarjetaResumen({ etiqueta, monto, resaltado = false }: TarjetaResumenProps) {
  return (
    <article className={`${card} ${resaltado ? "border-navy bg-navy text-white" : ""}`}>
      <h2 className={`text-sm ${resaltado ? "text-slate-300" : "text-slate-600"}`}>{etiqueta}</h2>
      <p className="mt-4 font-heading text-3xl font-extrabold">{money(monto)}</p>
    </article>
  )
}
