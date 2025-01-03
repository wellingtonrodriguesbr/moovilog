"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { QuickAccess } from "./quick-access";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";
import { formatCNPJ } from "@/utils/format-cnpj";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();

	return (
		<section className="mt-4 space-y-6 w-full">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-4xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
				<div className="hidden md:flex flex-col gap-1 items-end">
					{isGetCompanyInformationPending ? (
						<Skeleton className="h-5 md:h-4 w-24 md:w-[250px] rounded-lg" />
					) : (
						<p className="text-lg">{company?.name}</p>
					)}
					{isGetCompanyInformationPending ? (
						<Skeleton className="h-5 md:h-4 w-16 md:w-[150px] rounded-lg" />
					) : (
						<p className="text-zinc-700 text-xs">
							{formatCNPJ(company?.documentNumber ?? "")}
						</p>
					)}
				</div>
			</header>
			<QuickAccess />
		</section>
	);
}
