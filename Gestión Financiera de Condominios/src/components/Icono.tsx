

export default function Icono({ nombre }: { nombre: "building" | "arrow" | "check" | "upload" }) {
  const paths = {
    building: "M4 21V3h12v18M16 9h4v12M8 7h4M8 11h4M8 15h4M2 21h20",
    arrow: "M4 12h16m-6-6 6 6-6 6",
    check: "m5 12 4 4L19 6",
    upload: "M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5",
  }
  return <svg className="h-5 w-5 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[nombre]} /></svg>
}
