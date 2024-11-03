import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Page() {
  return (
    <div className="flex h-full">
      <div className="w-1/2 h-full p-8 bg-amber-300">
        <div className="flex items-center gap-2 mr-8">
          <Image alt="bee-icon" src="/bee-icon.svg" height={28} width={28} />
          <p className="text-xl font-semibold">Mighty Bee</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-full p-8">
        <p className="mb-4 text-xl font-bold">Welcome Back!</p>
        <div className="flex flex-col gap-2 w-96">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <Button className="flex gap-6 w-full" variant="outline">
              <Image
                alt="google-icon"
                src="/google-icon.svg"
                height={20}
                width={20}
              />
              <p>Log in with Google</p>
            </Button>
          </form>
          {/* <Button className="flex gap-6" variant="outline">
            <Image alt="microsoft-icon" src="/microsoft-icon.svg" height={20} width={20} />
            Log in with Microsoft
          </Button> */}
        </div>
        <p className="mt-4 text-sm text-center text-gray-500 max-w-64">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  )
}
