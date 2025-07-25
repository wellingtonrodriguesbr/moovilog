"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { useSendInvitationToCompanyMember } from "@/hooks/company-member/use-send-invitation-to-company-member";
import { MultiSelectUserPermissions } from "@/components/platform/multi-select-user-permissions";
import { SECTORS } from "@/utils/mocks/sectors";
import { COMPANY_MEMBER_PERMISSIONS } from "@/utils/mocks/company-member-permissions";

interface RegisterNewCollaboratorFormProps {
  onCloseDialog: () => void;
}

const formSchema = z.object({
  name: z.coerce.string().min(8, { message: "Digite o nome completo" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  sector: z.string(),
  permissions: z.string().array().min(1, { message: "Selecione pelo menos uma permissão" }),
});

export function RegisterNewCollaboratorForm({ onCloseDialog }: RegisterNewCollaboratorFormProps) {
  const { sendinvitationtoCompanyMember, isPendingSendInvitationToCompanyMember } = useSendInvitationToCompanyMember();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      sector: "",
      permissions: [],
    },
  });

  async function onSubmit(registerData: z.infer<typeof formSchema>) {
    try {
      await sendinvitationtoCompanyMember({
        ...registerData,
      });
      onCloseDialog();
      toast.success("Convite enviado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar convite");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <div className="flex items-center rounded-md overflow-hidden border pr-4">
                  <Input
                    className="border-0 rounded-none outline-none focus-visible:ring-0"
                    placeholder=""
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="colaborador@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Setor</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor do colaborador" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Permissão
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-64">
                    <p className="font-normal text-zinc-700">
                      Refere-se as permissões que este usuário poderá realizar dentro da conta da empresa.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <MultiSelectUserPermissions
                modalPopover
                options={COMPANY_MEMBER_PERMISSIONS}
                onUserPermissionsChange={(permissions) => form.setValue("permissions", permissions)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset className="flex justify-end gap-2 mt-6">
          <Button
            disabled={isPendingSendInvitationToCompanyMember}
            onClick={onCloseDialog}
            type="button"
            variant="destructive-outline"
          >
            Cancelar
          </Button>
          <Button disabled={isPendingSendInvitationToCompanyMember} type="submit">
            {isPendingSendInvitationToCompanyMember ? <Loader2 className="size-4 animate-spin" /> : "Enviar convite"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
