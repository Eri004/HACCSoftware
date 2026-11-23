import { useState, type FormEvent } from "react"
import { button, input } from "./styles"

type FormularioInicioSesionProps = { alIniciarSesion: (nombreUsuario: string, contrasena: string) => Promise<void> }

export default function FormularioInicioSesion({ alIniciarSesion }: FormularioInicioSesionProps) {
  const [nombreUsuario, establecerNombreUsuario] = useState("")
  const [contrasena, establecerContrasena] = useState("")
  const [error, establecerError] = useState("")
  const [enviando, establecerEnvio] = useState(false)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    if (!nombreUsuario.trim() || !contrasena.trim()) return
    establecerEnvio(true)
    establecerError("")
    try {
      await alIniciarSesion(nombreUsuario.trim(), contrasena)
    } catch (motivo) {
      establecerError(motivo instanceof Error ? motivo.message : "No se pudo iniciar sesión.")
    } finally {
      establecerEnvio(false)
    }
  }

  return (
    <form className="mt-8 w-full max-w-sm space-y-5 text-left" onSubmit={enviar}>
      <label className="block text-sm font-bold">
        Usuario o correo
        <input className={input} aria-label="Usuario o correo" autoComplete="username"
          required pattern=".*\S.*" value={nombreUsuario} onChange={e => establecerNombreUsuario(e.target.value)}
          placeholder="Ej. admin@hacc.com" />
      </label>
      <label className="block text-sm font-bold">
        Contraseña
        <input className={input} aria-label="Contraseña" type="password" autoComplete="current-password"
          required pattern=".*\S.*" value={contrasena} onChange={e => establecerContrasena(e.target.value)} />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button className={`${button} w-full`} type="submit" disabled={enviando}>{enviando ? "Validando..." : "Iniciar sesión"}</button>
    </form>
  )
}
