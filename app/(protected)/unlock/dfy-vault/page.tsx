import { UnlockUpgradeClient } from "@/app/(protected)/unlock/UnlockUpgradeClient"

export default function UnlockDFYVaultPage() {
  return (
    <UnlockUpgradeClient
      upgradeLevel="dfy_vault"
      upgradeName="DFY Vault"
      upgradeValue="$47"
      features={[
        "50+ Done-For-You comment templates",
        "Pre-written packs across categories",
        "Fast copy + tweak workflow",
        "Safer, non-spam patterns",
      ]}
    />
  )
}
