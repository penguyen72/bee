import { Button } from '@bee/ui/components/ui/button';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <div className="flex flex-nowrap items-center justify-between max-w-[1000px] gap-48 py-8">
        <div className="flex items-center">
          <div className="flex items-center gap-2 mr-8">
            {/* <Image alt="bee-icon" src="/bee-icon.svg" height={28} width={28} /> */}
            <p className="text-xl font-semibold">Mighty Bee</p>
          </div>
          <Button className="text-black" variant="link">
            Product
          </Button>
          <Button className="text-black" variant="link">
            How It Works
          </Button>
          <Button className="text-black" variant="link">
            Pricing
          </Button>
          <Button className="text-black" variant="link">
            Contact
          </Button>
        </div>
        <div className="flex">
          <Button className="text-black" variant="link">
            Sign Up
          </Button>
          <Button>Log In</Button>
        </div>
      </div>
      <div className="my-12 max-w-[800px] text-center gap-6 flex flex-col items-center">
        <p className="text-4xl font-semibold">Effortless Check-Ins for Your Nail Salon</p>
        <p>
          Streamline client check-ins, reduce wait times, and elevate the experience with a solution built for busy salons. Simplify
          bookings and create a seamless visit for every client.
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
