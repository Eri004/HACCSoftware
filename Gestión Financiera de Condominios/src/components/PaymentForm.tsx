import { useState, type FormEvent } from "react"
import type { Cargo } from "../types"
import { money } from "../utils/money"
import Icon from "./Icon"
import PageTitle from "./PageTitle"
import ReceiptUpload from "./ReceiptUpload"
import { button, card, input } from "./styles"

type PaymentInput = { method: string; reference: string; file: string }

export default function PaymentForm({ cargo, submit, back }: { cargo: Cargo; submit: (payment: PaymentInput) => Promise<void>; back: () => void }) {
  const [method, setMethod] = useState("Transferencia")
  const [reference, setReference] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)
  function chooseFile(value?: File) {
    if (!value) return
    if (!["image/jpeg", "image/png", "application/pdf"].includes(value.type) || value.size > 10 * 1024 * 1024) {
      setFile(null)
      setError("Selecciona un JPG, PNG o PDF de hasta 10 MB.")
    } else { setFile(value); setError("") }
  }
  function send(event: FormEvent) {
    event.preventDefault()
    if (!file) return setError("Adjunta un comprobante para continuar.")
    setSending(true)
    submit({ method, reference: reference.trim(), file: file.name })
      .catch(reason => setError(reason instanceof Error ? reason.message : "No se pudo registrar el pago."))
      .finally(() => setSending(false))
  }
  return (
    <section className="mx-auto max-w-2xl">
      <button className="mb-6 min-h-11 font-bold text-slate-600 focus-visible:ring-2" onClick={back}>← Estado de cuenta</button>
      <PageTitle label={`${cargo.unidad.torre} ${cargo.unidad.codigo} · ${cargo.numero}`}>Registrar pago</PageTitle>
      <form className={`${card} space-y-6`} onSubmit={send}>
        <p className="flex justify-between border-b border-slate-200 pb-5">Total a registrar<strong className="text-2xl text-emerald-dark">{money(cargo.saldo)}</strong></p>
        <label className="block text-sm font-bold">Método de pago<select className={input} aria-label="Método de pago" value={method} onChange={e => setMethod(e.target.value)}><option>Transferencia</option><option>Depósito</option></select></label>
        <label className="block text-sm font-bold">Número de referencia<input className={input} aria-label="Número de referencia" value={reference} onChange={e => setReference(e.target.value)} placeholder="Ej. 0048217365" /></label>
        <ReceiptUpload file={file} onChoose={chooseFile} />
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className={`${button} w-full`} disabled={sending}>{sending ? "Registrando..." : "Registrar comprobante"}<Icon name="arrow" /></button>
      </form>
    </section>
  )
}
