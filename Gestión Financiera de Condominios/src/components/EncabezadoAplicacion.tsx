import type { Role } from "../types"
import Icono from "./Icono"

type EncabezadoAplicacionProps = { rol: Role | null; alCerrarSesion: () => void; alInicio: () => void }

export default function EncabezadoAplicacion({ rol, alCerrarSesion, alInicio }: EncabezadoAplicacionProps) {
  return (
      <header className="border-b border-slate-200 bg-white px-5 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 py-4">
          <button className="flex min-h-11 items-center gap-3 font-heading text-xl font-extrabold focus-visible:ring-2" aria-label="HACC, ir a bienvenida" onClick={alInicio}><span className="rounded-xl bg-navy p-3 text-white"><Icono nombre="building" /></span>HACC</button>
          {rol && <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-bold text-slate-600">{rol === "admin" ? "Administrador" : "Residente"}</span>
            <button className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm font-bold hover:bg-slate-50 focus-visible:ring-2" onClick={alCerrarSesion}>Cerrar sesión</button>
          </div>}
        </div>
      </header>
  )
}
