import { Metadata } from "next";
import { Login } from "@/components/auth/pages/login";

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
