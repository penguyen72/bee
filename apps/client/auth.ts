import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const allowedUsers = await prisma.organizations.findMany({
        select: {
          emailAddress: true
        }
      })

      const allowedEmails = allowedUsers.map((item) => item.emailAddress)
      if (allowedEmails.includes(user?.email ?? "")) {
        return true
      } else {
        return false
      }
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig
})
