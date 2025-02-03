import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";
const publicRoutes = [{ path: "/login", whenAuthed: "redirect" }] as const;

const REDIRECT_WHEN_UNAUTHED = "/login";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("next-auth.session-token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_UNAUTHED;
    return NextResponse.redirect(redirectUrl);
  }
  if (authToken && publicRoute && publicRoute.whenAuthed === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    // Checar se o token expirou
    // Se não for, redirecionar para a página de login
    // Se for, retornar NextResponse.next()
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
