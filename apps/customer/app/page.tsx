import { getOrganization } from "@/actions/get-organization"
import { CheckInForm } from "@/components/check-in-form"
import { REWARDS } from "@/lib/constants"
import { ProjectError } from "@/lib/errors"
import Image from "next/image"
import { Fragment } from "react"

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
    <main className="grid grid-cols-12 h-full">
      <div className="relative col-span-8 flex flex-col bg-amber-50 gap-8 py-14 px-12">
        <div className="text-4xl font-semibold text-center">
          <p>Welcome to</p>
          <p>{organization.businessName}</p>
        </div>
        <CheckInForm organization={organization} />
      </div>
      <div className="col-span-4 bg-amber-200">
        <div className="flex flex-col p-14 gap-4">
          <Image src="bee-logo.svg" alt="bee-logo" width={110} height={220} />
          <div className="flex flex-col gap-6 items-center justify-center h-full">
            <p className="text-4xl font-semibold my-2">REWARDS</p>
            {REWARDS.map((reward, index, self) => {
              return (
                <Fragment key={index}>
                  <div className="flex flex-col items-center py-6 px-16 rounded-2xl bg-amber-100 border-white border-2 font-semibold w-full gap-2">
                    <p className="text-4xl">{reward.title}</p>
                    <p className="text-xl">{reward.description}</p>
                  </div>
                  {index !== self.length - 1 ? (
                    <div className="size-0 border-t-[24px] border-t-white border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent" />
                  ) : null}
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
