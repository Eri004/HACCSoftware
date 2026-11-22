import Icon from "./Icon"

type ReceiptUploadProps = { file: File | null; onChoose: (file?: File) => void }

export default function ReceiptUpload({ file, onChoose }: ReceiptUploadProps) {
  return (
        <label onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onChoose(e.dataTransfer.files[0]) }}
          className="relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center focus-within:ring-2 focus-within:ring-emerald">
          <Icon name={file ? "check" : "upload"} /><span className="max-w-full break-all font-bold">{file ? file.name : "Arrastra o selecciona tu comprobante"}</span><span className="text-sm text-slate-600">JPG, PNG o PDF · Hasta 10 MB</span>
          <input className="absolute inset-0 w-full cursor-pointer opacity-0" type="file" aria-label="Adjuntar comprobante" accept=".jpg,.jpeg,.png,.pdf" onChange={e => onChoose(e.target.files?.[0])} />
        </label>
  )
}
