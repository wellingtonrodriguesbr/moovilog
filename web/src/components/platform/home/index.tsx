"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { QuickAccess } from "./quick-access";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";
import { formatCNPJ } from "@/utils/format-cnpj";

export function Home() {
  const { profile, isGetProfilePending } = useGetProfile();
  const { company } = useGetCompanyInformation();

  return (
    <section className="space-y-12 w-full">
      <header className="flex justify-between">
        <h1 className="text-2xl md:text-4xl font-medium">
          {isGetProfilePending ? (
            <Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
          ) : (
            <>Olá, {profile?.name}</>
          )}
        </h1>
        <div className="space-y-1">
          <p className="text-lg">{company?.name}</p>
          <p className="text-zinc-700 text-xs">
            {formatCNPJ(company?.documentNumber ?? "")}
          </p>
        </div>
      </header>
      <QuickAccess />
    </section>
  );
}
