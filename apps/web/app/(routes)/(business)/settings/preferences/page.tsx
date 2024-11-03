import { signOut } from "@/auth"
import SettingsHeader from "@/features/settings/settings-header"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col p-12 gap-8">
      <SettingsHeader title="Preferences" />
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login" })
        }}
      >
        <Button variant="secondary" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  )
}
