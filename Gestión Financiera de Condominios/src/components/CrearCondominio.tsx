import { useState, type SyntheticEvent } from "react"
import type { Condo } from "../types"
import { fields } from "../data/mockData"
import Icono from "./Icono"
import TituloPagina from "./TituloPagina"
import { button, card, input } from "./styles"

export default function CrearCondominio({ condominio, guardar, volver }: { condominio: Condo; guardar: (valor: Condo) => void; volver: () => void }) {
  const [valores, establecerValores] = useState(condominio)
  function enviar(evento: SyntheticEvent<HTMLFormElement>) {
    evento.preventDefault()
    guardar(valores)
  }
  return (
    <section className="mx-auto max-w-3xl">
      <button className="mb-6 min-h-11 font-bold text-slate-600 focus-visible:ring-2" onClick={volver}>← Volver</button>
      <TituloPagina etiqueta="Comencemos">Tu condominio</TituloPagina>
      <form className={card} onSubmit={enviar}>
        <div className="grid gap-6 md:grid-cols-2">
          {fields.map(({ key, label: etiqueta, placeholder, type = "text" }) => (
            <label key={key} className="text-sm font-bold">{etiqueta}
              <input className={input} aria-label={etiqueta} required type={type} placeholder={placeholder}
                min={type === "number" ? 1 : undefined} step={type === "number" ? 1 : undefined}
                pattern={key === "ruc" ? "[0-9]{13}" : type === "text" ? ".*\\S.*" : undefined}
                title={key === "ruc" ? "Ingresa los 13 dígitos del RUC" : undefined}
                value={valores[key]} onChange={e => establecerValores({ ...valores, [key]: e.target.value })} />
            </label>
          ))}
        </div>
        <div className="mt-6 text-center"><button className={button}>Guardar y ver resumen<Icono nombre="arrow" /></button></div>
      </form>
    </section>
  )
}
