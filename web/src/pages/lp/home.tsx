import { Hero } from "@/pages/lp/sections/hero";
import { AboutPlatform } from "@/pages/lp/sections/about-platform";
import { Footer } from "@/pages/lp/sections/footer";
import { Benefits } from "@/pages/lp/sections/benefits";
import { Faq } from "@/pages/lp/sections/faq";

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
