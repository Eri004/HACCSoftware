import { Fragment, useState } from "react"
import type { Cargo } from "../types"
import { estadoCargo, fechaCargo, saldoCargo, subtotalConcepto, totalCargo } from "../utils/cargos"
import { money } from "../utils/money"

type TablaCargosAlicuotasProps = { cargos: Cargo[] }

const coloresEstado = {
  PENDIENTE: "bg-amber-50 text-amber-900",
  PARCIAL: "bg-blue-50 text-blue-800",
  PAGADO: "bg-mint text-emerald-dark",
  ANULADO: "bg-slate-100 text-slate-600",
}
const columnas = ["Unidad", "Residente Responsable", "Alícuota (%)", "Cuota Ordinaria", "Cargo y Periodo", "Total y Saldo", "Estado"]

export default function TablaCargosAlicuotas({ cargos }: TablaCargosAlicuotasProps) {
  const [expandido, establecerExpandido] = useState<string[]>([])

  function alternar(numero: string) {
    establecerExpandido(actual => actual.includes(numero)
      ? actual.filter(valor => valor !== numero)
      : [...actual, numero])
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <header className="flex flex-wrap items-center justify-between gap-2 p-6">
        <h2 className="font-heading text-xl font-bold">Alícuotas y cargos mensuales</h2>
        <span className="text-sm text-slate-600">{cargos.length} cargos</span>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{columnas.map(etiqueta => <th key={etiqueta} scope="col" className="px-5 py-4 font-medium">{etiqueta}</th>)}</tr>
          </thead>
          <tbody>
            {cargos.map(cargo => {
              const abierto = expandido.includes(cargo.numero)
              const estado = estadoCargo(cargo)
              const idDetalle = `detalle-${cargo.numero}`
              return (
                <Fragment key={cargo.numero}>
                  <tr className="cursor-pointer border-t border-slate-200 hover:bg-slate-50"
                    onClick={() => alternar(cargo.numero)}>
                    <td className="px-5 py-4">
                      <button className="flex min-h-11 items-center gap-2 whitespace-nowrap text-left font-bold focus-visible:ring-2"
                        aria-expanded={abierto} aria-controls={idDetalle}
                        aria-label={`${abierto ? "Ocultar" : "Ver"} conceptos de ${cargo.unidad.torre} ${cargo.unidad.codigo}`}
                        onClick={e => { e.stopPropagation(); alternar(cargo.numero) }}>
                        <span aria-hidden="true">{abierto ? "−" : "+"}</span>
                        {cargo.unidad.torre} · {cargo.unidad.codigo}
                      </button>
                    </td>
                    <td className="px-5 py-4">{cargo.residente.nombre}</td>
                    <td className="px-5 py-4">{cargo.alicuota.porcentaje.toFixed(2)}%</td>
                    <td className="px-5 py-4 font-bold">{money(cargo.alicuota.cuotaOrdinaria)}</td>
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap font-bold">{cargo.numero}</p>
                      <p className="mt-1 text-slate-600">{cargo.periodo}</p>
                      <p className="mt-1 whitespace-nowrap text-slate-600">Vence {fechaCargo(cargo.vencimiento)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap font-bold">Total {money(totalCargo(cargo))}</p>
                      <p className="mt-1 whitespace-nowrap text-slate-600">Saldo {money(saldoCargo(cargo))}</p>
                    </td>
                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${coloresEstado[estado]}`}>{estado}</span></td>
                  </tr>
                  <tr id={idDetalle} hidden={!abierto}>
                    <td colSpan={7} className="border-t border-slate-200 bg-slate-50 p-6">
                      <h3 className="mb-4 font-bold">Conceptos · {cargo.numero}</h3>
                      <table className="w-full text-sm">
                        <thead><tr>{["Tipo", "Descripción", "Cantidad", "Valor unitario", "Subtotal"].map(etiqueta =>
                          <th key={etiqueta} scope="col" className="px-4 py-3 font-medium text-slate-600">{etiqueta}</th>)}</tr></thead>
                        <tbody>{cargo.detalles.map(detalle => (
                          <tr key={detalle.id} className="border-t border-slate-200">
                            <td className="px-4 py-3 text-xs font-bold">{detalle.tipo}</td>
                            <td className="px-4 py-3">{detalle.descripcion}</td>
                            <td className="px-4 py-3">{detalle.cantidad}</td>
                            <td className="px-4 py-3">{money(detalle.valorUnitario)}</td>
                            <td className="px-4 py-3 font-bold">{money(subtotalConcepto(detalle))}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
