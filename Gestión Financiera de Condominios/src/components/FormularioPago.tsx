import { useState, type FormEvent } from "react"
import type { Cargo } from "../types"
import { money } from "../utils/money"
import Icono from "./Icono"
import TituloPagina from "./TituloPagina"
import CargaComprobante from "./CargaComprobante"
import { button, card, input } from "./styles"

type EntradaPago = { metodo: string; referencia: string; archivo: string }

export default function FormularioPago({ cargo, enviar, volver }: { cargo: Cargo; enviar: (pago: EntradaPago) => Promise<void>; volver: () => void }) {
  const [metodo, establecerMetodo] = useState("Transferencia")
  const [referencia, establecerReferencia] = useState("")
  const [archivo, establecerArchivo] = useState<File | null>(null)
  const [error, establecerError] = useState("")
  const [enviando, establecerEnvio] = useState(false)
  function elegirArchivo(valor?: File) {
    if (!valor) return
    if (!["image/jpeg", "image/png", "application/pdf"].includes(valor.type) || valor.size > 10 * 1024 * 1024) {
      establecerArchivo(null)
      establecerError("Selecciona un JPG, PNG o PDF de hasta 10 MB.")
    } else { establecerArchivo(valor); establecerError("") }
  }
  function manejarEnvio(evento: FormEvent) {
    evento.preventDefault()
    if (!archivo) return establecerError("Adjunta un comprobante para continuar.")
    establecerEnvio(true)
    enviar({ metodo, referencia: referencia.trim(), archivo: archivo.name })
      .catch(motivo => establecerError(motivo instanceof Error ? motivo.message : "No se pudo registrar el pago."))
      .finally(() => establecerEnvio(false))
  }
  return (
    <section className="mx-auto max-w-2xl">
      <button className="mb-6 min-h-11 font-bold text-slate-600 focus-visible:ring-2" onClick={volver}>← Estado de cuenta</button>
      <TituloPagina etiqueta={`${cargo.unidad.torre} ${cargo.unidad.codigo} · ${cargo.numero}`}>Registrar pago</TituloPagina>
      <form className={`${card} space-y-6`} onSubmit={manejarEnvio}>
        <p className="flex justify-between border-b border-slate-200 pb-5">Total a registrar<strong className="text-2xl text-emerald-dark">{money(cargo.saldo)}</strong></p>
        <label className="block text-sm font-bold">Método de pago<select className={input} aria-label="Método de pago" value={metodo} onChange={e => establecerMetodo(e.target.value)}><option>Transferencia</option><option>Depósito</option></select></label>
        <label className="block text-sm font-bold">Número de referencia<input className={input} aria-label="Número de referencia" value={referencia} onChange={e => establecerReferencia(e.target.value)} placeholder="Ej. 0048217365" /></label>
        <CargaComprobante archivo={archivo} alElegir={elegirArchivo} />
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className={`${button} w-full`} disabled={enviando}>{enviando ? "Registrando..." : "Registrar comprobante"}<Icono nombre="arrow" /></button>
      </form>
    </section>
  )
}
