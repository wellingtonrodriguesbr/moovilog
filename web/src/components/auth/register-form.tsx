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

const formSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome completo" }),
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
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  async function onSubmit({
    name,
    email,
    password,
  }: z.infer<typeof formSchema>) {
    try {
      await registerNewUser({
        name,
        email,
        password,
        role: "ADMIN",
      });

      await login({ email, password });
      toast.success("Conta cadastrada com sucesso");
      router.push("/cadastro/empresa");
    } catch (error) {
      console.log(error);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seuemail@email.com" {...field} />
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
                <Input type="password" placeholder="*********" {...field} />
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
                  Ao se cadastrar, você concorda com os termos e a política de
                  privacidade da plataforma.
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
