import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Mighty Bee",
  description: "A Check In Application"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
