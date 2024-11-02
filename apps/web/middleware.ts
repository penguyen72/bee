import { auth } from "@/auth"
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutePrefix,
  publicRoutes
} from "./routes"

export default auth((req) => {
  const { nextUrl } = req
  console.log(req)
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute =
    nextUrl.pathname.startsWith(publicRoutePrefix) ||
    publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/overview", nextUrl))
  }

  if (!isLoggedIn && !(isAuthRoute || isPublicRoute)) {
    return Response.redirect(new URL("/login", nextUrl))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
}
