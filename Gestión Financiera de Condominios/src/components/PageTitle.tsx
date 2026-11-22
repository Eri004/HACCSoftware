import type { ReactNode } from "react"
import { heading } from "./styles"

export default function PageTitle({ label, children }: { label: string; children: ReactNode }) {
  return <header className="mb-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-emerald-dark">{label}</p><h1 className={heading}>{children}</h1></header>
}
