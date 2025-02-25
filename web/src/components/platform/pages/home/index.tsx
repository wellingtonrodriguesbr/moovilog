"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { QuickAccess } from "@/components/platform/pages/home/components/quick-access";
import { BarChartComponent } from "@/components/platform/pages/home/components/home-metrics/bar-chart";
import { PieChartComponent } from "@/components/platform/pages/home/components/home-metrics/pie-chart";
import { Construction } from "lucide-react";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="flex flex-col mt-4 gap-8 w-full h-[85vh]">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<div className="w-full h-full flex flex-col gap-4 items-center justify-center flex-1 bg-zinc-100 p-6 rounded-md">
				<Construction className="size-12 md:size-24 text-amber-500" />
				<h2 className="text-2xl md:text-4xl text-center max-w-2xl leading-normal md:leading-relaxed">
					A página home está sendo construída, mas fique a vontade
					para explorar! 🚀
				</h2>
			</div>
			{/* <QuickAccess />
			<div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
				<BarChartComponent />
				<PieChartComponent />
			</div> */}
		</section>
	);
}
