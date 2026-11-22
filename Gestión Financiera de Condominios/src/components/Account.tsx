import type { Cargo, Payment, User } from "../types"
import PageTitle from "./PageTitle"
import BalanceCard from "./BalanceCard"
import DuesCard from "./DuesCard"
import PaymentHistory from "./PaymentHistory"

export default function Account({ user, cargos, payments, payment, pay, detail }: {
  user: User
  cargos: Cargo[]
  payments: Payment[]
  payment: Payment | null
  pay: () => void
  detail: () => void
}) {
  const balance = cargos.filter(cargo => !cargo.anulado).reduce((sum, cargo) => sum + cargo.saldo, 0)
  return (
    <>
      <PageTitle label={`${user.personaName} · ${user.unidadCodigo || "Unidad"}`}>Tu estado de cuenta</PageTitle>
      <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
        <BalanceCard balance={balance} payment={payment} pay={pay} detail={detail} />
        <DuesCard cargos={cargos} />
      </div>
      <PaymentHistory payments={payments} />
    </>
  )
}
