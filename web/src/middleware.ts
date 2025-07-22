import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {
    path: "/entrar",
    whenAuthenticated: "redirect",
  },
  {
    path: "/cadastro",
    whenAuthenticated: "redirect",
  },
  {
    path: "/concluir-cadastro",
    whenAuthenticated: "next",
  },
  {
    path: "/validacao-do-codigo",
    whenAuthenticated: "next",
  },
  {
    path: "/redefinir-senha",
    whenAuthenticated: "next",
  },
  {
    path: "/redefinir-senha/sucesso",
    whenAuthenticated: "next",
  },
  {
    path: "/",
    whenAuthenticated: "next",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/entrar";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const token = request.cookies.get("refreshToken");

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/inicio";

    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
