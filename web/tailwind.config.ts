import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
			},
			colors: {
				app: {
					blue: {
						50: "#ebf2ff",
						100: "#dbe6ff",
						200: "#bed1ff",
						300: "#97b1ff",
						400: "#6e84ff",
						500: "#2222FF",
						600: "#2820D6",
						700: "#291DAF",
						900: "#150B25",
					},
					cyan: {
						100: "#BAF5FE",
						200: "#A0F1FD",
						300: "#81EDFD",
						400: "#5BE9FC",
						500: "#00E5FC",
					},
					yellow: {
						100: "#FFFFB0",
						200: "#FFFF94",
						300: "#FFFF76",
						400: "#FFFF54",
						500: "#FFFF22",
					},
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s linear",
				"accordion-up": "accordion-up 0.2s linear",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
