"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { HomeSummary } from "@/components/platform/pages/home/components/home-summary";
import { ScheduleOfTheDay } from "./components/schedule-of-the-day";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="flex flex-col mt-4 gap-12 w-full h-full pb-12">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_600px] gap-8">
				<div className="flex flex-col gap-20">
					<HomeSummary />
					<ScheduleOfTheDay />
				</div>
				<div className="flex flex-col gap-4"></div>
			</div>
		</section>
	);
}
