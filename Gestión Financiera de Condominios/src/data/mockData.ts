import type { Condo } from "../types"

export const fields: { key: keyof Condo; label: string; placeholder: string; type?: string }[] = [
  { key: "name", label: "Nombre", placeholder: "Residencias del Parque" },
  { key: "ruc", label: "RUC", placeholder: "1790012345001" },
  { key: "address", label: "Dirección", placeholder: "Calle y número" },
  { key: "city", label: "Ciudad", placeholder: "Quito" },
  { key: "units", label: "Número de Departamentos", placeholder: "48", type: "number" },
  { key: "email", label: "Email Constitucional", placeholder: "administracion@condominio.com", type: "email" },
]
