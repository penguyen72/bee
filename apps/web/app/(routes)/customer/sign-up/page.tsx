import { SignUpForm } from "@/features/customer/sign-up-form"
import { HomeButton } from "@/components/home-button"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col flex-wrap">
      <HomeButton />
      <div className="bg-amber-300 min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full flex flex-col items-center px-4">
          <p className="text-3xl font-semibold mb-20">Nice to meet you!</p>
          <SignUpForm />
        </div>
      </div>
      <div className="bg-amber-200 min-h-[25vh] flex items-center justify-center">
        <p className="text-2xl font-semibold">We hope you enjoy your visit!</p>
      </div>
    </main>
  )
}
