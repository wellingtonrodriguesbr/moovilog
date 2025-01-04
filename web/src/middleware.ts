import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("refreshToken");

	if (!token) {
		// return NextResponse.redirect(new URL("/entrar", request.url));
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/inicio",
		"/financeiro",
		"/fretes",
		"/rotas",
		"/motoristas",
		"/veiculos",
		"/meus-dados",
		"/minha-empresa/colaboradores",
		"/minha-empresa/dados-cadastrais",
	],
};
