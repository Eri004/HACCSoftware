import FormularioInicioSesion from "./FormularioInicioSesion"

export default function Bienvenida({ alIniciarSesion }: { alIniciarSesion: (nombreUsuario: string, contrasena: string) => Promise<void> }) {
  return (
    <section className="flex min-h-[calc(100dvh-93px)] w-full items-center justify-center bg-white px-5 py-12 text-center md:px-10">
      <div className="flex w-full max-w-2xl flex-col items-center">
        <p className="mb-7 text-sm font-bold uppercase tracking-[0.18em] text-emerald-dark">Tu comunidad, en orden</p>
        <h1 className="font-heading text-7xl font-extrabold tracking-tight md:text-8xl">HACC<span className="text-emerald">.</span></h1>
        <h2 className="mt-5 max-w-lg font-heading text-2xl font-bold leading-snug md:text-3xl">Herramienta Asesora de Cuotas en Condominios</h2>
        <FormularioInicioSesion alIniciarSesion={alIniciarSesion} />
      </div>
    </section>
  )
}
