import { getOrganization } from "../actions/get-organization"
import { HeaderActions } from "./header-actions"

export async function Header() {
  const organization = await getOrganization()

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <h2 className="text-xl font-semibold">{organization.businessName}</h2>
      <HeaderActions />
    </div>
  )
}
