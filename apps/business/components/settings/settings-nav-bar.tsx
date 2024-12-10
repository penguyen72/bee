"use client"

import { SettingsNavItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CircleHelp, User, Users, Wrench } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Fragment } from "react"

const items: SettingsNavItem[] = [
  {
    key: "profile",
    icon: User,
    label: "Profile",
    path: "/profile"
  },
  {
    key: "members",
    icon: Users,
    label: "Members",
    path: "/edit-member"
  },
  {
    key: "preferences",
    icon: Wrench,
    label: "Preferences",
    path: "/preferences"
  },
  {
    key: "help",
    icon: CircleHelp,
    label: "Help",
    path: "/help"
  }
]

export function SettingsNavBar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Fragment>
      <p className="text-3xl font-semibold pl-12 py-5">Settings</p>
      {items.map((item) => {
        return (
          <div
            key={item.key}
            className={cn(
              "flex items-center gap-4 py-2 pl-12 hover:cursor-pointer",
              pathname.includes(item.path) && "bg-amber-200"
            )}
            onClick={() => router.push(`${item.path}`)}
          >
            <item.icon size={36} />
            <p className="text-lg font-semibold">{item.label}</p>
          </div>
        )
      })}
    </Fragment>
  )
}
