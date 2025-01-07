import { getUser } from "@/actions/get-user"
import { HomeButton } from "@/components/home-button"
import { Redirect } from "@/components/redirect"
import { ProjectError } from "@/lib/errors"
import { findNextPossibleRedemption } from "@/lib/utils"
import Image from "next/image"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const response = await getUser(params.id)

  if (response.error)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: response.error
    })

  const user = response.data

  if (!user)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid User!"
    })

  if (user.visitCount === 1 && user.currentPoints === 0) {
    return (
      <main className="flex flex-col min-h-screen bg-amber-50 h-full">
        <div className="flex flex-col p-8 h-full">
          <Image src="bee-logo.svg" alt="bee-logo" width={110} height={220} />
          <div className="flex flex-col m-auto text-center">
            <p className="text-5xl">
              Thank you <span className="font-semibold">{user.firstName}</span>
            </p>
            <p className="text-5xl">for Signing Up!</p>
            <p className="text-2xl py-12">
              You will earn points for Today&apos;s Visit after Check Out!
            </p>
          </div>
          <HomeButton />
        </div>
        <Redirect />
      </main>
    )
  }

  const nextPossibleRedemption = findNextPossibleRedemption(user.currentPoints)

  return (
    <main className="flex flex-col min-h-screen bg-amber-50 h-full">
      <div className="flex flex-col p-8 h-full">
        <Image src="bee-logo.svg" alt="bee-logo" width={110} height={220} />
        <div className="flex flex-col m-auto text-center">
          <p className="text-5xl">
            Welcome back,{" "}
            <span className="font-semibold">{user.firstName}</span>.
          </p>
          <p className="text-5xl">Thank you for Checking In!</p>
          <p className="text-2xl py-6">
            You have <span className="font-semibold">{user.currentPoints}</span>{" "}
            Points
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-amber-200 p-8 text-center text-2xl">
        {user.currentPoints < nextPossibleRedemption ? (
          <p>
            Earn {nextPossibleRedemption - user.currentPoints} more Points for
            your next reward!
          </p>
        ) : (
          <p>
            Please let us know at checkout if you&apos;d like to redeem your
            points!
          </p>
        )}
        <HomeButton />
      </div>
      <Redirect />
    </main>
  )
}
