import { Button } from '@/components/ui/button';
import Image from 'next/image';

const prices = [
  { plan: 'Basic', price: 20 },
  { plan: 'Pro', price: 50 },
  { plan: 'Premium', price: 100 },
];

export default function Page() {
  return (
    <div className="flex h-full">
      <div className="bg-amber-300 w-1/2 p-8 h-full">
        <div className="flex items-center gap-2 mr-8">
          <Image alt="bee-icon" src="/bee-icon.svg" height={28} width={28} />
          <p className="text-xl font-semibold">Mighty Bee</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 p-8 h-full">
        <p className="text-xl font-bold mb-4">Create an account</p>
        <div className="flex flex-col gap-2 w-96">
          <Button className="flex gap-6" variant="outline">
            <Image
              alt="google-icon"
              src="/google-icon.svg"
              height={20}
              width={20}
            />
            <p>Continue with Google</p>
          </Button>
          <Button className="flex gap-6" variant="outline">
            <Image
              alt="microsoft-icon"
              src="/microsoft-icon.svg"
              height={20}
              width={20}
            />
            Continue with Microsoft
          </Button>
        </div>
        <p className="text-sm text-gray-500 max-w-64 text-center mt-4">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
