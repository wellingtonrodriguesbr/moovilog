import Link from "next/link";

import { CompanyLoginForm } from "./company-login-form";

export function Login() {
	return (
		<div className="w-full flex flex-col justify-center">
			<h1 className="font-semibold text-2xl md:text-3xl my-8">
				Acesse sua conta
			</h1>
			<CompanyLoginForm />
			<Link href="/cadastro" className="text-center mt-8">
				Ainda não possui uma conta?{" "}
				<span className="underline font-medium">Registre-se</span>
			</Link>
		</div>
	);
}
