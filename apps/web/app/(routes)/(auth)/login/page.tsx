import { signIn } from '@/auth';
import { Button } from '@bee/ui/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex h-full flex-col text-center bg-amber-300 items-center justify-center p-12">
      <div className="bg-amber-200 rounded-[40px] py-10 px-16 w-[500px] max-w-[600px]">
        <p className="text-3xl font-semibold mb-4">Sign In</p>
        <p>Welcome back! Please sign in to your account. </p>
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <Button className="mt-4" variant="secondary" type="submit">
            <FaGoogle className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
        </form>
      </div>
    </main>
  );
}
