import { resend } from "@/mail/mail-client";

export interface EmailDetails {
	from: string;
	to: string[];
	subject: string;
	react: JSX.Element;
}

export class EmailQueue {
	private queue: EmailDetails[];
	private isProcessing: boolean;
	private rateLimit: number;

	constructor(rateLimit: number) {
		this.queue = [];
		this.isProcessing = false;
		this.rateLimit = rateLimit; // Rate limit in milliseconds
	}

	enqueue(emailDetails: EmailDetails): void {
		this.queue.push(emailDetails);
		this.processQueue();
	}

	private async processQueue(): Promise<void> {
		if (this.isProcessing) return;

		this.isProcessing = true;
		while (this.queue.length > 0) {
			const emailDetails = this.queue.shift();
			if (emailDetails) {
				await this.sendEmail(emailDetails);
				await this.sleep(this.rateLimit);
			}
		}
		this.isProcessing = false;
	}

	private async sendEmail(emailDetails: EmailDetails): Promise<void> {
		try {
			await resend.emails
				.send(emailDetails)
				.then((res: any) => {
					console.log("Success: ", res);
				})
				.catch((error: any) => {
					console.log("Error: ", error);
				});
		} catch (error) {
			console.error("Erro ao enviar email:", error);
		}
	}

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
