"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { QuickActions } from "@/components/platform/pages/home/components/quick-actions";
import { ScheduleOfTheDay } from "./components/schedule-of-the-day";
import { Notices } from "./components/notices";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="flex flex-col mt-4 gap-12 w-full h-full">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-11 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<div className="flex flex-col gap-16">
				<QuickActions />
				<div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] gap-12">
					<ScheduleOfTheDay />
					<Notices />
				</div>
			</div>
		</section>
	);
}
