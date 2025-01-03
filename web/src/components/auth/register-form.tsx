"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterNewUser } from "@/hooks/use-register-new-user";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/use-login";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { formatPhone } from "@/utils/format-phone";

const formSchema = z.object({
	name: z.string().min(3, { message: "Digite seu nome completo" }),
	phone: z
		.string()
		.min(11, { message: "Digite um telefone válido" })
		.transform((value) => value.replace(/\D/g, "")),
	email: z.string().email({ message: "Digite um endereço de e-mail válido" }),
	password: z
		.string()
		.min(8, { message: "A senha precisa ter no mínimo 8 caracteres" }),
	acceptTerms: z.boolean({ message: "Aceite os termos para prosseguir" }),
});

export function RegisterForm() {
	const router = useRouter();
	const { registerNewUser, isPendingRegisterNewUser } = useRegisterNewUser();
	const { login, isPendingLogin } = useLogin();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			password: "",
			acceptTerms: false,
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await registerNewUser({
				...data,
			});

			await login({ email: data.email, password: data.password });
			toast.success("Conta cadastrada com sucesso");
			router.push("/cadastro/empresa");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					toast.error("Já existe uma conta com este e-mail");
				}
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Celular</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="(00) 00000-0000"
									value={formatPhone(field.value)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									placeholder="seuemail@email.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*********"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="acceptTerms"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FormLabel
									htmlFor={field.name}
									className="flex items-center gap-2 text-sm font-medium"
								>
									<Checkbox
										id={field.name}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									Ao se cadastrar, você concorda com os termos
									e a política de privacidade da plataforma.
								</FormLabel>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={
						!form.watch("acceptTerms") ||
						isPendingRegisterNewUser ||
						isPendingLogin
					}
					type="submit"
					className="w-full mt-6"
				>
					{isPendingRegisterNewUser || isPendingLogin ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Avançar"
					)}
				</Button>
			</form>
		</Form>
	);
}
