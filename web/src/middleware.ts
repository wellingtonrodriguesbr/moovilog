import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("refreshToken");

	if (!token) {
		return NextResponse.redirect(new URL("/entrar", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/inicio",
		"/financeiro/:path*",
		"/operacional/:path*",
		"/fretes/:path*",
		"/coletas/:path*",
		"/rotas",
		"/motoristas",
		"/veiculos",
		"/meus-dados",
		"/colaboradores",
		"/dados-cadastrais",
		"/gestao-de-desempenho",
	],
};
