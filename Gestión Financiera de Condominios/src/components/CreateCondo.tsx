import { useState, type FormEvent } from "react"
import type { Condo } from "../types"
import { fields } from "../data/mockData"
import Icon from "./Icon"
import PageTitle from "./PageTitle"
import { button, card, input } from "./styles"

export default function CreateCondo({ condo, save, back }: { condo: Condo; save: (value: Condo) => void; back: () => void }) {
  const [values, setValues] = useState(condo)
  function submit(event: FormEvent) {
    event.preventDefault()
    save(values)
  }
  return (
    <section className="mx-auto max-w-3xl">
      <button className="mb-6 min-h-11 font-bold text-slate-600 focus-visible:ring-2" onClick={back}>← Volver</button>
      <PageTitle label="Comencemos">Tu condominio</PageTitle>
      <form className={card} onSubmit={submit}>
        <div className="grid gap-6 md:grid-cols-2">
          {fields.map(({ key, label, placeholder, type = "text" }) => (
            <label key={key} className="text-sm font-bold">{label}
              <input className={input} aria-label={label} required type={type} placeholder={placeholder}
                min={type === "number" ? 1 : undefined} step={type === "number" ? 1 : undefined}
                pattern={key === "ruc" ? "[0-9]{13}" : type === "text" ? ".*\\S.*" : undefined}
                title={key === "ruc" ? "Ingresa los 13 dígitos del RUC" : undefined}
                value={values[key]} onChange={e => setValues({ ...values, [key]: e.target.value })} />
            </label>
          ))}
        </div>
        <div className="mt-6 text-center"><button className={button}>Guardar y ver resumen<Icon name="arrow" /></button></div>
      </form>
    </section>
  )
}
