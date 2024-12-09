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
      <body className="bg-amber-200">{children}</body>
    </html>
  )
}
