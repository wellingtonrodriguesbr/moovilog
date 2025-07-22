"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "@/hooks/auth/use-login";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Digite um endereço de e-mail válido" }),
  password: z.string().min(8, { message: "A senha precisa ter no mínimo 8 caracteres" }),
});

export function LoginForm() {
  const router = useRouter();
  const { login, isPendingLogin } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    try {
      await login({ email, password });
      router.push("/inicio");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast.error("Não existe uma conta com este e-mail");
          return;
        } else if (error.response?.status === 401) {
          toast.error("E-mail ou senha incorretos");
          return;
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
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
        <fieldset className="flex justify-end">
          <Link
            href="/redefinir-senha"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-800 hover:underline transition-all"
          >
            Esqueci minha senha
          </Link>
        </fieldset>
        <Button disabled={isPendingLogin} type="submit" className="w-full">
          {isPendingLogin ? <Loader2 className="size-4 animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
