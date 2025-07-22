"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPhone } from "@/utils/format-phone";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { useEffect } from "react";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Digite seu nome completo" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  phone: z.string().min(11, { message: "Digite um número de celular válido" }),
});

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { profile, isGetProfilePending } = useGetProfile();

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name ?? "",
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.setValue("name", profile.name);
      form.setValue("email", profile.email);
      form.setValue("phone", profile.phone);
    }
  }, [profile, form]);

  return (
    <Form {...form}>
      {isGetProfilePending ? (
        <fieldset className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="flex gap-2 mt-2">
            <Skeleton className="w-28 h-9" />
            <Skeleton className="w-full h-9" />
          </div>
        </fieldset>
      ) : (
        <form
          className="w-full flex flex-col gap-3 mt-6"
          // onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input className="pointer-events-none" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    className="pointer-events-none"
                    type="email"
                    placeholder="Seu e-mail"
                    {...field}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input
                    className="pointer-events-none"
                    placeholder="(00) 00000-0000"
                    {...field}
                    value={formatPhone(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      )}
    </Form>
  );
}
