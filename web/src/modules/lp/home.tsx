import { Hero } from "@/modules/lp/sections/hero";
import { AboutPlatform } from "@/modules/lp/sections/about-platform";
import { Footer } from "@/modules/lp/sections/footer";
import { Benefits } from "@/modules/lp/sections/benefits";
import { Faq } from "@/modules/lp/sections/faq";

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
