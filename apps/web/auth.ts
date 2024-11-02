import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const allowedUsers = process.env.GOOGLE_PROVIDER_ALLOWED_USERS
      const allowedEmails = allowedUsers
        ? allowedUsers.split(",").filter((user) => user)
        : []

      if (allowedEmails.includes(user?.email ?? "")) {
        return true
      } else {
        return false
      }
    }
  }
})
