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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { formatCEP } from "@/utils/format-cep";
import { useEffect } from "react";
import { useRegisterCompanyAddress } from "@/hooks/use-register-company-address";
import { useGetCompanyAddressByZipCode } from "@/hooks/use-get-company-address-by-zip-code";
import { toast } from "sonner";

const formSchema = z.object({
  zipCode: z.coerce
    .string()
    .min(8, { message: "Digite um CEP válido" })
    .max(8, { message: "Digite um CEP válido" }),
  street: z.string().min(3, { message: "Campo obrigatório" }),
  neighborhood: z.string().min(5, { message: "Campo obrigatório" }),
  number: z.string().min(1, { message: "Campo obrigatório" }),
  complement: z.string().optional().nullable(),
  city: z.string().min(2, { message: "Campo obrigatório" }),
  acronym: z.string().min(2, { message: "Campo obrigatório" }),
});

export function RegisterCompanyAddressForm() {
  const router = useRouter();

  const { registerCompanyAddress, isPendingRegisterCompanyAddress } =
    useRegisterCompanyAddress();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      street: "",
      neighborhood: "",
      number: "",
      complement: "",
      city: "",
      acronym: "",
    },
  });

  const zipCode = form.watch("zipCode");

  const { data, isPendingGetCompanyAddress, status } =
    useGetCompanyAddressByZipCode({
      zipCode,
    });

  async function onSubmit({
    city,
    street,
    number,
    neighborhood,
    zipCode,
    acronym,
    complement,
  }: z.infer<typeof formSchema>) {
    try {
      await registerCompanyAddress({
        cityName: city,
        street,
        number: Number(number),
        neighborhood,
        zipCode,
        acronym,
        complement,
      });
      toast.success("Endereço cadastrado com sucesso");
      router.push("/cadastro/empresa/membro");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    form.setValue("street", data?.street ?? "");
    form.setValue("neighborhood", data?.neighborhood ?? "");
    form.setValue("city", data?.city ?? "");
    form.setValue("acronym", data?.state ?? "");

    if (status === "error") {
      form.reset();
    }
  }, [data, form, status]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <div className="flex items-center rounded-md overflow-hidden border pr-4">
                  <Input
                    className="border-0 rounded-none outline-none focus-visible:ring-0"
                    placeholder="00000-000"
                    autoComplete="off"
                    {...field}
                    onChange={({ currentTarget }) =>
                      form.setValue("zipCode", currentTarget.value)
                    }
                    value={formatCEP(field.value)}
                  />
                  {zipCode.length === 8 && isPendingGetCompanyAddress ? (
                    <Loader2 className="size-4 text-app-blue-500 animate-spin" />
                  ) : null}
                  {!isPendingGetCompanyAddress && status === "error" ? (
                    <X className="size-4 text-red-500" />
                  ) : null}
                  {!isPendingGetCompanyAddress && status === "success" ? (
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
        <fieldset className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    disabled={
                      isPendingGetCompanyAddress || status === "pending"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    disabled={
                      isPendingGetCompanyAddress || status === "pending"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    disabled={
                      isPendingGetCompanyAddress || status === "pending"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    disabled={
                      isPendingGetCompanyAddress || status === "pending"
                    }
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    disabled={
                      isPendingGetCompanyAddress || status === "pending"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acronym"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UF</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    disabled={
                      isPendingGetCompanyAddress || status === "pending"
                    }
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button
          disabled={
            isPendingRegisterCompanyAddress || isPendingGetCompanyAddress
          }
          type="submit"
          className="w-full mt-6 gap-2"
        >
          {isPendingRegisterCompanyAddress ? (
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
