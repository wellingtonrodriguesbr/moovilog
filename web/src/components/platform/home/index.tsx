"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { QuickAccess } from "./quick-access";

export function Home() {
  const { profile, isGetProfilePending } = useGetProfile();

  return (
    <section className="space-y-12 w-full">
      <h1 className="text-2xl md:text-4xl font-medium">
        {isGetProfilePending ? (
          <Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
        ) : (
          <>Olá, {profile?.name}</>
        )}
      </h1>
      <QuickAccess />
    </section>
  );
}