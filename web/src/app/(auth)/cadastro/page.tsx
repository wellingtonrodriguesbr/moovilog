import { Metadata } from "next";
import { Register } from "@/components/auth/pages/register";

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
