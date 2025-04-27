import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			primary: "var(--theme-primary)",
			secondary: "var(--theme-secondary)",
			heading: "var(--theme-heading)",
			paragraph: "var(--theme-paragraph)",
			action: "var(--theme-action)",
			borderColor: "var(--theme-borderColor)",
		},
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [],
} satisfies Config;
