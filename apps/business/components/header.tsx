import { ProjectError } from "@/lib/errors"
import { getOrganization } from "../actions/get-organization"
import { HeaderActions } from "./header-actions"

export const dynamic = "force-dynamic"

export async function Header() {
  const response = await getOrganization()

  if (response.error) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: response.error
    })
  }

  const organization = response.data

  if (!organization) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid Organization!"
    })
  }

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <h2 className="text-xl font-semibold">{organization.businessName}</h2>
      <HeaderActions />
    </div>
  )
}
