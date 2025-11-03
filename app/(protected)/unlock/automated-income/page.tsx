import { UnlockUpgradeClient } from "@/app/(protected)/unlock/UnlockUpgradeClient"

export default function UnlockAutomatedIncomePage() {
  return (
    <UnlockUpgradeClient
      upgradeLevel="automated_income"
      upgradeName="Automated Income"
      upgradeValue="$197"
      features={[
        "Everything in Instant Income",
        "Automated traffic system",
        "AI-powered optimization",
        "Priority support",
        "Monthly live coaching calls",
        "Private mastermind access",
      ]}
    />
  )
}
