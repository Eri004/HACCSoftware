import { useEffect, useState } from "react"
import type { Condo } from "../types"
import type { Cargo } from "../types"
import { api } from "../services/api"
import { saldoCargo, totalCargo } from "../utils/cargos"
import PageTitle from "./PageTitle"
import SummaryCard from "./SummaryCard"
import TablaCargosAlicuotas from "./TablaCargosAlicuotas"
import { input } from "./styles"

type DashboardProps = { condo: Condo; onCreate: () => void }

export default function Dashboard({ condo, onCreate }: DashboardProps) {
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [month, setMonth] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    api.getCargos().then(data => {
      setCargos(data)
      setMonth(data[0]?.periodo ?? "")
    }).catch(reason => setError(reason instanceof Error ? reason.message : "No se pudieron cargar los cargos."))
  }, [])
  const months = [...new Set(cargos.map(cargo => cargo.periodo))]
  const rows = cargos.filter(cargo => cargo.periodo === month)
  const activos = rows.filter(cargo => !cargo.anulado)
  const total = activos.reduce((sum, cargo) => sum + totalCargo(cargo), 0)
  const saldo = activos.reduce((sum, cargo) => sum + saldoCargo(cargo), 0)
  const summaries = [
    { label: "Total facturado", amount: total, highlighted: true },
    { label: "Recaudado", amount: total - saldo },
    { label: "Saldo pendiente", amount: saldo },
  ]

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitle label={condo.name || "Residencias del Parque"}>Resumen financiero</PageTitle>
        <div className="flex flex-wrap gap-3">
          <button className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold focus-visible:ring-2"
            onClick={onCreate}>{condo.name ? "Editar condominio" : "Crear condominio"}</button>
          <select className={`${input} mt-0 w-auto`} aria-label="Mes del resumen" value={month}
            onChange={e => setMonth(e.target.value)}>
            {months.map(name => <option key={name}>{name}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {summaries.map(summary => <SummaryCard key={summary.label} {...summary} />)}
      </div>
      {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
      {!error && cargos.length === 0 && <p className="mb-4 text-sm text-slate-600">Cargando cargos...</p>}
      <TablaCargosAlicuotas key={month} cargos={rows} />
    </>
  )
}
