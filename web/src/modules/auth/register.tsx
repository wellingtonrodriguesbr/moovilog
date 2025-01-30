import Link from "next/link";

import { RegisterForm } from "@/modules/auth/components/register-form";

export function Register() {
	return (
		<div className="w-full flex flex-col justify-center">
			<h1 className="font-semibold text-2xl md:text-3xl my-8">
				Crie uma conta gratuitamente
			</h1>
			<RegisterForm />

			<Link href="/entrar" className="text-center mt-8">
				Já possui uma conta?{" "}
				<span className="underline font-medium">Faça login</span>
			</Link>
		</div>
	);
}
