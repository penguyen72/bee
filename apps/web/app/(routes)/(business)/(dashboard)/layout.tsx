import { Header } from '@/components/business/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full h-full p-6">
      <Header />
      {children}
    </div>
  );
}
