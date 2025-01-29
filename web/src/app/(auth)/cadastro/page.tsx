import { Metadata } from "next";
import { Register } from "@/pages/auth/register";

export const metadata: Metadata = {
	title: "Cadastro | Moovilog",
	description: "",
};

export default function RegisterPage() {
	return (
		<section className="w-full">
			<Register />
		</section>
	);
}
