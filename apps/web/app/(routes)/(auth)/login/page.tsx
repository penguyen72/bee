import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

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
            Sign in with Google
          </Button>
        </form>
      </div>
    </main>
  );
}
