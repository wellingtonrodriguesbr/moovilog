"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/use-get-profile";
import { QuickAccess } from "@/components/platform/home/quick-access";
import { BarChartComponent } from "@/components/platform/metrics/bar-chart";
import { PieChartComponent } from "@/components/platform/metrics/pie-chart";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="mt-4 space-y-6 w-full">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<QuickAccess />
			<div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4">
				<BarChartComponent />
				<PieChartComponent />
			</div>
		</section>
	);
}
