"use client";

import MainComponentAdmin from "@/components/admin/main";
import axios from "axios";
import { useEffect, useState } from "react";

interface Colors {
	primary: string;
	secondary: string;
	action: string;
	[key: string]: string;
	logo: string; // Allow for additional dynamic keys if needed
}

export default function Admin() {
	const [logo, setLogo] = useState<string>("");

	async function applyDynamicColors(): Promise<void> {
		try {
			const response = await axios.get<Colors>(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/theme`
			);
			const colors = response.data;

			if (colors) {
				Object.entries(colors).forEach(([key, value]) => {
					setLogo(colors.logo);
					if (typeof value === "string") {
						// Dynamically set CSS variables based on the response
						document.documentElement.style.setProperty(`--theme-${key}`, value);
					} else {
						console.warn(`Skipping invalid color value for key: ${key}`);
					}
				});
			}
		} catch (error) {
			console.error("Failed to fetch and apply dynamic colors:", error);
		}
	}

	useEffect(() => {
		applyDynamicColors();
	}, []);
	return (
		<main className='w-full h-full flex bg-primary'>
			<MainComponentAdmin logo={logo} />
		</main>
	);
}
