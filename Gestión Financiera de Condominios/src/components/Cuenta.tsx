import type { Cargo, Payment, User } from "../types"
import TituloPagina from "./TituloPagina"
import TarjetaSaldo from "./TarjetaSaldo"
import TarjetaCuotas from "./TarjetaCuotas"
import HistorialPagos from "./HistorialPagos"

export default function Cuenta({ usuario, cargos, pagos, pago, pagar, detalle }: {
  usuario: User
  cargos: Cargo[]
  pagos: Payment[]
  pago: Payment | null
  pagar: () => void
  detalle: () => void
}) {
  const saldo = cargos.filter(cargo => !cargo.anulado).reduce((acumulado, cargo) => acumulado + cargo.saldo, 0)
  return (
    <>
      <TituloPagina etiqueta={`${usuario.personaName} · ${usuario.unidadCodigo || "Unidad"}`}>Tu estado de cuenta</TituloPagina>
      <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
        <TarjetaSaldo saldo={saldo} pago={pago} pagar={pagar} detalle={detalle} />
        <TarjetaCuotas cargos={cargos} />
      </div>
      <HistorialPagos pagos={pagos} />
    </>
  )
}
