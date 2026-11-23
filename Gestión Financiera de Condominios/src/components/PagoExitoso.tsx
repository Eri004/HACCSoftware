import type { Payment } from "../types"
import { money } from "../utils/money"
import Icono from "./Icono"
import TituloPagina from "./TituloPagina"
import { button, card } from "./styles"

type PagoExitosoProps = { pago: Payment; siguiente: () => void }

export default function PagoExitoso({ pago, siguiente }: PagoExitosoProps) {
  const detalles = [
    ["Monto", money(pago.monto)],
    ["Método", pago.formaPago],
    ["Referencia", pago.referencia],
    ["Fecha", new Date(pago.fechaPago).toLocaleString("es-EC")],
  ]
  return (
<section className={`${card} mx-auto max-w-lg text-center`}>
          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-emerald-dark"><Icono nombre="check" /></span>
          <TituloPagina etiqueta="Registro confirmado">¡Pago registrado!</TituloPagina>
          <dl className="mb-7 space-y-4 text-left text-sm">{detalles.map(([etiqueta, valor]) => <div key={etiqueta} className="flex justify-between gap-4 border-t border-slate-200 pt-3"><dt className="text-slate-600">{etiqueta}</dt><dd className="break-all text-right font-bold">{valor}</dd></div>)}</dl>
          <button className={`${button} w-full`} onClick={siguiente}>Ver estado actualizado<Icono nombre="arrow" /></button>
        </section>
  )
}
