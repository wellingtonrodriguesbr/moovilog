import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateDriver } from "@/hooks/driver/use-update-driver";
import { toast } from "sonner";

import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";

import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { Driver } from "@/interfaces";

interface UpdateDriverFormProps {
  driver: Driver;
  onCloseDialog: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Digite o nome completo" }),
  documentNumber: z
    .string()
    .min(11, { message: "Digite um CPF válido" })
    .max(14, { message: "Digite um CPF válido" })
    .transform((value) => value.replace(/\D/g, "")),
  phone: z
    .string()
    .min(11, { message: "Digite um telefone válido" })
    .transform((value) => value.replace(/\D/g, ""))
    .transform((phone) => phone.slice(0, 11)),
  type: z.enum(["AGGREGATE", "INTERNAL", "FREELANCER"], {
    message: "Selecione uma opção",
  }),
});

export function UpdateDriverForm({ onCloseDialog, driver }: UpdateDriverFormProps) {
  const { updateDriver, isPendingUpdateDriver } = useUpdateDriver();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: driver.name ?? "",
      documentNumber: driver.documentNumber ?? "",
      phone: driver.phone ?? "",
      type: driver.type ?? undefined,
    },
  });

  async function onSubmit(updateData: z.infer<typeof formSchema>) {
    try {
      await updateDriver({ ...updateData, driverId: driver.id });
      onCloseDialog();
      toast.success("Motorista atualizado com sucesso");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error("Você não tem permissão para esta ação, fale com seu gestor.");
        }
      } else {
        toast.error("Erro ao atualizar motorista");
      }
    } finally {
      form.reset();
      onCloseDialog();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="documentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
                  autoComplete="off"
                  maxLength={14}
                  {...field}
                  onChange={({ currentTarget }) => form.setValue("documentNumber", currentTarget.value)}
                  value={formatCPF(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode="numeric"
                  pattern="\(\d{2}\) \d{5}-\d{4}"
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de motorista</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INTERNAL">Interno</SelectItem>
                  <SelectItem value="AGGREGATE">Agregado</SelectItem>
                  <SelectItem value="FREELANCER">Freelancer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset className="flex justify-end gap-2 mt-6">
          <Button disabled={isPendingUpdateDriver} onClick={onCloseDialog} type="button" variant="destructive-outline">
            Cancelar
          </Button>
          <Button disabled={isPendingUpdateDriver} type="submit">
            {isPendingUpdateDriver ? <Loader2 className="size-4 animate-spin" /> : "Salvar"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
