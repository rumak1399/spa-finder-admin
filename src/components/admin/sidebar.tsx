"use client";

import Image from "next/image";

type Props = {
	setTab: (text: string) => void;
	logo: string;
};

const SidebarAdnin = (props: Props) => {
	const { setTab, logo } = props;

	return (
		<aside className='w-[25%] h-screen flex flex-col  bg-secondary shadow-md text-primary py-4 px-8'>
			<div className='self-start mb-20'>
				<Image
					className=''
					width={260}
					height={90}
					src={logo || ""}
					alt='logo'
				/>
			</div>
			{/* <div
				onClick={() => setTab("Overview")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Overview
			</div> */}
			<div
				onClick={() => setTab("Products")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Products
			</div>

			<div
				onClick={() => setTab("Orders")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Orders
			</div>

			<div
				onClick={() => setTab("Categories")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Categories
			</div>
			<div
				onClick={() => setTab("Slider Image")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Home slider
			</div>
			<div
				onClick={() => setTab("Customars")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Customars
			</div>

			<div
				onClick={() => setTab("Enquries")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Enquries
			</div>
			<div
				onClick={() => setTab("Messages")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Messages
			</div>
			<div
				onClick={() => setTab("Careers")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Careers
			</div>
			<div
				onClick={() => setTab("Applications")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Applications
			</div>
			<div
				onClick={() => setTab("Subscribers")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Subscribers
			</div>
			<div
				onClick={() => setTab("Theme")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Theme
			</div>
			<div
				onClick={() => setTab("Settings")}
				className='w-[80%] px-2 py-1 cursor-pointer rounded-md hover:bg-action'
			>
				Settings
			</div>
		</aside>
	);
};

export default SidebarAdnin;
