import { useState, type FormEvent } from "react"
import { button, input } from "./styles"

type LoginFormProps = { onLogin: (username: string, password: string) => Promise<void> }

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!username.trim() || !password.trim()) return
    setSending(true)
    setError("")
    try {
      await onLogin(username.trim(), password)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo iniciar sesión.")
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="mt-8 w-full max-w-sm space-y-5 text-left" onSubmit={submit}>
      <label className="block text-sm font-bold">
        Usuario o correo
        <input className={input} aria-label="Usuario o correo" autoComplete="username"
          required pattern=".*\S.*" value={username} onChange={e => setUsername(e.target.value)}
          placeholder="Ej. admin@hacc.com" />
      </label>
      <label className="block text-sm font-bold">
        Contraseña
        <input className={input} aria-label="Contraseña" type="password" autoComplete="current-password"
          required pattern=".*\S.*" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button className={`${button} w-full`} type="submit" disabled={sending}>{sending ? "Validando..." : "Iniciar sesión"}</button>
    </form>
  )
}
