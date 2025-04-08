import { Metadata } from "next";
import { ResetPassword } from "@/components/auth/pages/reset-password";

export const metadata: Metadata = {
	title: "Redefinir senha | Moovilog",
	description: "",
};

export default function ResetPasswordPage() {
	return (
		<section className="w-full">
			<ResetPassword />
		</section>
	);
}
