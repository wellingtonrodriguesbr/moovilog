import { Metadata } from "next";
import { Login } from "@/pages/auth/login";

export const metadata: Metadata = {
	title: "Entrar | Moovilog",
	description: "",
};

export default function LoginPage() {
	return (
		<section className="w-full">
			<Login />
		</section>
	);
}
