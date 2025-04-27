"use client";

import { useEffect } from "react";

export interface Colors {
	primary: string;
	secondary: string;
	action: string;
	[key: string]: string; // Allow for additional dynamic keys if needed
}

const Topbar = ({ theme }: { theme: Colors }) => {
	useEffect(() => {
		if (theme) {
			Object.entries(theme).forEach(([key, value]) => {
				if (typeof value === "string") {
					// Dynamically set CSS variables based on the response

					document.documentElement.style.setProperty(`--theme-${key}`, value);
				} else {
					console.warn(`Skipping invalid color value for key: ${key}`);
				}
			});
		}
	}, [theme]);
	return (
		<div className='w-full h-fit lg:h-[40px] bg-gradient-to-r from-secondary to-action text-primary  flex  justify-center mb-1 sm:mb-0 '>
			<div className='w-[80%] max-w-[1170px] py-2 flex justify-between items-center flex-wrap'>
				<p>Welcome To Multivision Technology (Pvt.) Ltd</p>
				<div className='flex gap-2 flex-wrap'>
					<p>info@multivisionbd.com</p>
					<p>+8801670108772 ; +8801712343916</p>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
