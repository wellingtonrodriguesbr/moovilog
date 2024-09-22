import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ButtonToCopyEmailProps {
	email: string;
}

export function ButtonToCopyEmail({ email }: ButtonToCopyEmailProps) {
	const [copyEmail, setCopyEmail] = useState(false);

	async function handleCopyCompanyMemberEmail(email: string) {
		await navigator.clipboard.writeText(email);
		setCopyEmail(true);

		setTimeout(() => {
			setCopyEmail(false);
		}, 1000);
	}

	return (
		<Button
			onClick={() => handleCopyCompanyMemberEmail(email)}
			title="Copiar e-mail"
			variant="ghost"
			className="gap-2"
		>
			{copyEmail ? (
				<Check className="size-4 text-app-blue-500" />
			) : (
				<Copy className="size-4" />
			)}
			{email}
		</Button>
	);
}
