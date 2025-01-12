import { Hero } from "@/components/lp/hero";
import { AboutPlatform } from "@/components/lp/about-platform";
import { Footer } from "@/components/lp/footer";
import { Benefits } from "@/components/lp/benefits";

export function Home() {
	return (
		<div>
			<Hero />
			<AboutPlatform />
			<Benefits />
			<Footer />
		</div>
	);
}
