import { Button } from '@bee/ui/components/ui/button';
import { Card, CardContent, CardHeader } from '@bee/ui/components/ui/card';
import { Check } from 'lucide-react';
import Image from 'next/image';

const prices = [
  { plan: 'Basic', price: 20 },
  { plan: 'Pro', price: 50 },
  { plan: 'Premium', price: 100 },
];

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <div className="flex flex-nowrap items-center justify-between max-w-[1000px] gap-48 py-12">
        <div className="flex items-center">
          <div className="flex items-center gap-2 mr-8">
            <Image alt="bee-icon" src="/bee-icon.svg" height={28} width={28} />
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
        <p className="font-semibold text-4xl">Pricing</p>
        <p>
          Choose the plan that works best for your salon’s size and goals. Each plan comes with seamless check-in, client management, and
          customization options to keep clients coming back.
        </p>
      </div>
      <div className="grid grid-cols-3 my-12 gap-6">
        {prices.map((item) => {
          return (
            <Card className="w-72">
              <CardHeader className="text-lg font-semibold">{item.plan}</CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="flex">
                  <p className="text-3xl font-bold">${item.price}</p>
                  <p className="font-bold">/mo</p>
                </span>
                <Button className="my-3">Get Started</Button>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">What's included</p>
                  <div className="text-sm">
                    <div className="flex gap-1 items-center">
                      <Check className="size-4 text-amber-500" />
                      <p>Rewards Program</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Check className="size-4 text-amber-500" />
                      <p>Send Promotions</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Check className="size-4 text-amber-500" />
                      <p>Unlimited Messages</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
