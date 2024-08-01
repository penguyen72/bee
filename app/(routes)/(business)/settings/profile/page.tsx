import { ChangePasswordForm } from '@/components/settings/change-password-form';
import { ProfileForm } from '@/components/settings/profile-form';
import SettingsHeader from '@/components/settings/settings-header';
import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <div className="flex flex-col p-12 gap-8">
      <SettingsHeader title="Profile" />
      <div className="flex flex-col gap-8">
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
