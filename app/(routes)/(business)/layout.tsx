import { OverviewHeader } from '@/components/business/overview-header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="bg-gray-50 min-h-screen p-6 h-full">{children}</main>;
}
