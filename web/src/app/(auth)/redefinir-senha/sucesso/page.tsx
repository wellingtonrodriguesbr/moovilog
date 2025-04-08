import { Metadata } from "next";

export const metadata: Metadata = {
	title: "E-mail enviado | Moovilog",
	description: "",
};

export default function ResetPasswordSuccessPage() {
	return (
		<section className="w-full">
			<div>
				<h1 className="font-semibold text-2xl md:text-3xl mt-8">
					E-mail enviado com sucesso! ✅
				</h1>
				<p className="text-zinc-600 mt-4">
					Enviamos um e-mail com instruções para redefinir sua senha
					aqui na plataforma!
				</p>
			</div>
		</section>
	);
}
