import { Hero } from "@/components/lp/hero";
import { AboutPlatform } from "@/components/lp/about-platform";
import { Footer } from "@/components/lp/footer";

export function Home() {
	return (
		<div className="space-y-12 pb-12">
			<Hero />
			<AboutPlatform />
			{/* <Footer /> */}
		</div>
	);
}
