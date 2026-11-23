import { useEffect, useState } from "react"
import type { Condo } from "../types"
import type { Cargo } from "../types"
import { api } from "../services/api"
import { saldoCargo, totalCargo } from "../utils/cargos"
import TituloPagina from "./TituloPagina"
import TarjetaResumen from "./TarjetaResumen"
import TablaCargosAlicuotas from "./TablaCargosAlicuotas"
import { input } from "./styles"

type PanelControlProps = { condominio: Condo; alCrear: () => void }

export default function PanelControl({ condominio, alCrear }: PanelControlProps) {
  const [cargos, establecerCargos] = useState<Cargo[]>([])
  const [mes, establecerMes] = useState("")
  const [error, establecerError] = useState("")
  useEffect(() => {
    api.getCargos().then(datos => {
      establecerCargos(datos)
      establecerMes(datos[0]?.periodo ?? "")
    }).catch(motivo => establecerError(motivo instanceof Error ? motivo.message : "No se pudieron cargar los cargos."))
  }, [])
  const meses = [...new Set(cargos.map(cargo => cargo.periodo))]
  const filas = cargos.filter(cargo => cargo.periodo === mes)
  const activos = filas.filter(cargo => !cargo.anulado)
  const total = activos.reduce((acumulado, cargo) => acumulado + totalCargo(cargo), 0)
  const saldo = activos.reduce((acumulado, cargo) => acumulado + saldoCargo(cargo), 0)
  const resumenes = [
    { etiqueta: "Total facturado", monto: total, resaltado: true },
    { etiqueta: "Recaudado", monto: total - saldo },
    { etiqueta: "Saldo pendiente", monto: saldo },
  ]

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <TituloPagina etiqueta={condominio.name || "Residencias del Parque"}>Resumen financiero</TituloPagina>
        <div className="flex flex-wrap gap-3">
          <button className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold focus-visible:ring-2"
            onClick={alCrear}>{condominio.name ? "Editar condominio" : "Crear condominio"}</button>
          <select className={`${input} mt-0 w-auto`} aria-label="Mes del resumen" value={mes}
            onChange={e => establecerMes(e.target.value)}>
            {meses.map(nombre => <option key={nombre}>{nombre}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {resumenes.map(resumen => <TarjetaResumen key={resumen.etiqueta} {...resumen} />)}
      </div>
      {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
      {!error && cargos.length === 0 && <p className="mb-4 text-sm text-slate-600">Cargando cargos...</p>}
      <TablaCargosAlicuotas key={mes} cargos={filas} />
    </>
  )
}
