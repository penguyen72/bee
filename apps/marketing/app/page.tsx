import { Footer } from "@/components/footer"
import { GetStartedButton } from "@/components/get-started-button"
import { Header } from "@/components/header"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full">
      <Header />
      <div className="flex flex-col items-center max-w-[1100px] w-full mx-auto">
        <div className="py-24 px-4 w-full min-h-[600px] flex flex-col justify-between">
          <div className="flex flex-col items-start gap-2 text-center">
            <p className="text-5xl font-semibold">
              Simplified Loyalty Solutions
            </p>
            <p className="text-2xl">for Your Small Business</p>
            <p className="py-2">
              Strengthen your customer relationships and drive recurring
              business.
            </p>
            <GetStartedButton />
          </div>
        </div>
      </div>

      <div id="product" className="flex flex-col w-full bg-amber-50">
        <div className="flex flex-col items-center max-w-[1100px] w-full mx-auto">
          <div className="py-24 px-4 w-full min-h-[800px] flex flex-col justify-between">
            <div className="flex flex-col items-start gap-2 text-center">
              <p className="text-3xl font-semibold">Product</p>
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      <div
        id="pricing"
        className="flex flex-col items-center max-w-[1100px] w-full mx-auto"
      >
        <div className="py-24 px-4 w-full min-h-[800px] flex flex-col justify-between">
          <div className="flex flex-col items-start gap-2 text-center">
            <p className="text-3xl font-semibold">Pricing</p>
            Coming Soon
          </div>
        </div>
      </div>

      <div id="why-us" className="flex flex-col w-full bg-amber-50">
        <div className="flex flex-col items-center max-w-[1100px] w-full mx-auto">
          <div className="py-24 px-4 w-full min-h-[800px] flex flex-col justify-between">
            <div className="flex flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <p className="text-3xl font-semibold">Why Us?</p>
                <Image
                  alt="large-bee-logo"
                  src="/large-bee-logo.svg"
                  width={80}
                  height={30}
                />
              </div>
              <p>
                At <strong>Mighty Bee</strong>, we recognize the unique
                challenges small businesses face. Like a bee pollinates flowers
                to promote growth, our intuitive and simple loyalty program
                helps you effortlessly cultivate strong customer
                connections—ensuring your small business can flourish and
                thrive.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="py-2 text-2xl font-semibold">Are You Ready?</p>
              <GetStartedButton />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
