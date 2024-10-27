import { signOut } from '@/auth';
import SettingsHeader from '@/components/settings/settings-header';
import { Button } from '@bee/ui/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-12">
      <SettingsHeader title="Preferences" />
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/log-in' });
        }}
      >
        <Button variant="secondary" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
