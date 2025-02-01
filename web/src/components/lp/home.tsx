import { Hero } from "@/components/lp/sections/hero";
import { AboutPlatform } from "@/components/lp/sections/about-platform";
import { Footer } from "@/components/lp/sections/footer";
import { Benefits } from "@/components/lp/sections/benefits";
import { Faq } from "@/components/lp/sections/faq";

export function Home() {
	return (
		<div>
			<Hero />
			<AboutPlatform />
			<Benefits />
			<Faq />
			<Footer />
		</div>
	);
}
