import { getOrganizationProfile } from "@/actions/get-organization-profile"
import { ChangePasswordForm } from "@/features/settings/change-password-form"
import { ProfileForm } from "@/features/settings/profile-form"
import SettingsHeader from "@/features/settings/settings-header"

export default async function Home() {
  const data = await getOrganizationProfile(process.env.BUSINESS_EMAIL)

  if (data.error) {
    return (
      <div className="flex flex-col p-12 gap-8 h-full overflow-y-scroll items-center justify-center">
        {data.error}
      </div>
    )
  }

  if (!data.organization) return null

  return (
    <div className="flex flex-col p-12 gap-8 h-full overflow-y-scroll">
      <SettingsHeader title="Profile" />
      <div className="flex flex-col gap-8">
        <ProfileForm organizationInfo={data.organization} />
        {/* <ChangePasswordForm /> */}
      </div>
    </div>
  )
}
