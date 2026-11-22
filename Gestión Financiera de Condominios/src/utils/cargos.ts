import type { Cargo, DetalleCargo } from "../types"

export const subtotalConcepto = (detalle: DetalleCargo) =>
  Math.round(detalle.subtotal * 100) / 100

export const totalCargo = (cargo: Cargo) => cargo.total

export const saldoCargo = (cargo: Cargo) => cargo.anulado ? 0 : cargo.saldo

export const estadoCargo = (cargo: Cargo) => cargo.estado

export const fechaCargo = (fecha: string) =>
  new Date(`${fecha}T12:00:00`).toLocaleDateString("es-EC")
