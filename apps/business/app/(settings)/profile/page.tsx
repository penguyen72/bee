import { getOrganization } from "@/actions/get-organization"
import { ProfileForm } from "@/features/settings/components/profile-form"
import SettingsHeader from "@/features/settings/components/settings-header"
import { ProjectError } from "@/lib/errors"

export const dynamic = "force-dynamic"

export default async function Home() {
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
    <div className="flex flex-col p-12 gap-8 h-full overflow-y-scroll">
      <SettingsHeader title="Profile" />
      <div className="flex flex-col gap-8">
        <ProfileForm organization={organization} />
        {/* <ChangePasswordForm /> */}
      </div>
    </div>
  )
}
