"use client";

import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRegisterCompanyMember } from "@/hooks/use-register-company-member";
import { useRegisterNewUser } from "@/hooks/use-register-new-user";

const formSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome completo" }),
  email: z.string().email({ message: "Digite um endereço de e-mail válido" }),
  password: z
    .string()
    .min(8, { message: "A senha precisa ter no mínimo 8 caracteres" }),
  role: z
    .enum(["ADMIN", "FINANCIAL", "OPERATIONAL", "MEMBER"])
    .or(z.undefined()),
});

export function RegisterCompanyMemberForm() {
  const router = useRouter();
  const { registerNewUser, isPendingRegisterNewUser } = useRegisterNewUser();
  const { registerCompanyMember, isPendingRegisterCompanyMember } =
    useRegisterCompanyMember();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  async function onSubmit({
    name,
    email,
    password,
    role,
  }: z.infer<typeof formSchema>) {
    try {
      const { userId } = await registerNewUser({ name, email, password, role });
      await registerCompanyMember({ userId, role });

      router.push("/inicio");
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
                <Input placeholder="" {...field} />
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
                <Input placeholder="" {...field} />
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
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                O membro poderá alterar posteriormente
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atribua um cargo ao usuário</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Cargo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="FINANCIAL">Financeiro</SelectItem>
                  <SelectItem value="OPERATIONAL">Operacional</SelectItem>
                  <SelectItem value="MEMBER">Membro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPendingRegisterCompanyMember || isPendingRegisterNewUser}
          type="submit"
          className="w-full mt-6 gap-2"
        >
          {isPendingRegisterCompanyMember ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Concluir"
          )}
        </Button>

        <Button variant="ghost" type="button" className="gap-2" asChild>
          <Link href="/inicio">
            Farei isso mais tarde <ArrowRight className="size-4" />
          </Link>
        </Button>
      </form>
    </Form>
  );
}
