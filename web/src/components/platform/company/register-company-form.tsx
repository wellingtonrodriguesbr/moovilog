"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useValidateCompanyDocumentNumber } from "@/hooks/use-validate-company-document-number";
import { formatCNPJ } from "@/utils/format-cnpj";

const formSchema = z.object({
  documentNumber: z
    .string()
    .min(14, { message: "Digite um CNPJ válido" })
    .max(14, { message: "Digite um CNPJ válido" }),
  name: z.string().min(3, { message: "Digite seu nome completo" }),
  type: z.string().min(5, { message: "Selecione uma opção" }),
  size: z.string().min(5, { message: "Selecione uma opção" }),
  acceptTerms: z.boolean({ message: "Aceite os termos para prosseguir" }),
});

export function RegisterCompanyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentNumber: "",
      name: "",
      type: "",
      size: "",
      acceptTerms: false,
    },
  });
  const router = useRouter();
  const documentNumber = form.watch("documentNumber");

  const { isReady, isValid, isPendingValidate } =
    useValidateCompanyDocumentNumber({
      documentNumber,
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // router.push("/entrar/empresa");
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
          name="documentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <div className="flex items-center rounded-md overflow-hidden border pr-4">
                  <Input
                    className="border-0 rounded-none outline-none focus-visible:ring-0"
                    placeholder="00.000.000/0000-00"
                    autoComplete="off"
                    {...field}
                    onChange={({ currentTarget }) =>
                      form.setValue("documentNumber", currentTarget.value)
                    }
                    value={formatCNPJ(field.value)}
                  />
                  {isReady && isPendingValidate ? (
                    <Loader2 className="size-4 text-app-blue-500 animate-spin" />
                  ) : null}
                  {isReady && !isPendingValidate && !isValid ? (
                    <X className="size-4 text-red-500" />
                  ) : null}
                  {isReady && !isPendingValidate && isValid ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : null}
                </div>
              </FormControl>
              <FormDescription>
                Digite apenas os números, sem traços ou pontos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão social</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione qual é o tipo da sua empresa" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="HEADQUARTERS">Matriz</SelectItem>
                  <SelectItem value="BRANCH">Filial</SelectItem>
                  <SelectItem value="AGENCY">Agência</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamanho</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho da sua empresa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MICRO">
                    Microempresa (Faturamento anual de até R$ 360mil)
                  </SelectItem>
                  <SelectItem value="SMALL">
                    Pequena empresa (Faturamento anual de até R$ 4.8 milhões)
                  </SelectItem>
                  <SelectItem value="MEDIUM">
                    Média empresa (Faturamento anual de até R$ 300 milhões)
                  </SelectItem>
                  <SelectItem value="BIG">
                    Grande empresa (Faturamento anual ultrapassa R$ 300 milhões)
                  </SelectItem>
                </SelectContent>
              </Select>
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
                  Ao cadastrar sua empresa, você concorda com os termos e a
                  política de privacidade da plataforma.
                </FormLabel>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!form.watch("acceptTerms") || !isValid}
          type="submit"
          className="w-full mt-6 gap-2"
        >
          {false ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Avançar
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}