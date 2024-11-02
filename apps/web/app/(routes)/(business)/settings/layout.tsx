import { SettingsNavBar } from "@/components/settings/settings-nav-bar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <div className="min-w-[300px] bg-amber-300">
        <SettingsNavBar />
      </div>
      <div className="bg-amber-200 w-full">{children}</div>
    </div>
  )
}
