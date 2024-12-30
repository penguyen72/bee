import { getOrganization } from "@/actions/get-organization"
import { HomeActions } from "@/components/home-actions"
import { SignOutButton } from "@/components/sign-out-button"

export default async function Home() {
  const organization = await getOrganization()

  return (
    <main className="relative flex flex-col h-full text-center">
      <SignOutButton />
      <div className="bg-[#FFF3D0] flex-1 flex flex-col gap-8 items-center justify-center p-12">
        <p className="mb-12 text-6xl font-extrabold">
          Welcome to {organization.businessName}!
        </p>
        <HomeActions />
      </div>
      <div className="bg-[#FFF7EA] flex flex-col items-center justify-center p-12 gap-1">
        <p className="mb-2 text-3xl font-semibold">
          Check In and Earn Points for your Next Visits!
        </p>
        <p className="text-xl">250 Points = $10 Off</p>
        <p className="text-xl">500 Points = $20 Off</p>
        <p className="text-xl">750 Points = $35 Off</p>
      </div>
    </main>
  )
}
