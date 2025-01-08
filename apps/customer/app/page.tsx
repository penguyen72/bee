import { getDashboardData } from "@/actions/get-dashboard-data"
import { CheckInForm } from "@/components/check-in-form"
import { ProjectError } from "@/lib/errors"
import Image from "next/image"
import { Fragment } from "react"

export const dynamic = "force-dynamic"

export default async function Home() {
  const response = await getDashboardData()

  if (response.error) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: response.error
    })
  }

  const organization = response.data?.organization
  const redemptions = response.data?.redemptions

  if (!organization) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Unable to get Organization!"
    })
  }

  if (!redemptions) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Unable to get Redemptions!"
    })
  }

  return (
    <main className="grid grid-cols-12 h-full">
      <div className="relative col-span-12 sm:col-span-8 flex flex-col bg-amber-50 gap-4 xl:gap-8 p-8 xl:p-12">
        <div className="text-3xl xl:text-4xl font-semibold text-center">
          <p>Welcome to</p>
          <p>{organization.businessName}</p>
        </div>
        <CheckInForm organization={organization} />
      </div>
      <div className="col-span-12 sm:col-span-4 bg-amber-200">
        <div className="flex flex-col p-8 xl:p-12 gap-3 xl:gap-4">
          <div className="relative h-14 xl:h-20 w-28 xl:w-36">
            <Image src="bee-logo.svg" alt="bee-logo" fill objectFit="contain" />
          </div>
          <div className="flex flex-col gap-4 xl:gap-6 items-center justify-center h-full">
            <p className="text-3xl xl:text-4xl font-semibold xl:my-2">
              REWARDS
            </p>
            {redemptions.map((item, index, self) => {
              return (
                <Fragment key={index}>
                  <div className="flex flex-col items-center py-4 xl:py-6 px-8 xl:px-16 rounded-2xl bg-amber-100 border-white border-2 font-semibold w-full gap-1 xl:gap-2">
                    <p className="text-3xl xl:text-4xl">${item.value} Off</p>
                    <p className="text-base xl:text-xl">
                      {item.pointsRequired} Points
                    </p>
                  </div>
                  {index !== self.length - 1 ? (
                    <div className="size-0 border-t-[16px] xl:border-t-[24px] border-t-white border-l-[72px] xl:border-l-[80px] border-l-transparent border-r-[72px] xl:border-r-[80px] border-r-transparent" />
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
