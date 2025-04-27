"use client";

import Image from "next/image";
import Link from "next/link";
import { ICategory } from "./categoriesDropdwon";
import MobileCategoriesDropdown from "./mobilecategorymenu";
import { useState } from "react";

const MobileMenu = ({
	menuvisible,
	setMenuVisible,
	allcategories,
}: {
	menuvisible: boolean;
	setMenuVisible: (prop: boolean) => void;
	allcategories: ICategory[];
}) => {
	const [categoryopen, setcategoryopen] = useState<boolean>(false);

	return (
		<div
			className={`w-full max-w-[360px] h-screen overflow-y-auto fixed top-0 ${
				menuvisible ? "left-[0px]" : "left-[-400px]"
			} z-[999999] bg-gradient-to-r to-action from-secondary transition-all duration-500 text-primary  `}
		>
			<div className='w-full h-15 p-4 flex justify-end items-center  '>
				<button
					onClick={() => setMenuVisible(false)}
					className='w-[26px] h-[26px] flex justify-center items-center text-[16px] bg-primary text-heading rounded-full '
				>
					✕
				</button>
			</div>
			<div className='divide-y divide-primary'>
				<Link href={"/"}>
					<div className='py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary '>
						Home
					</div>
				</Link>

				<div className='   py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary relative'>
					<div
						onClick={() => setcategoryopen(!categoryopen)}
						className='flex justify-between'
					>
						<span>Products</span>
						<Image
							src={"/next-arrow.svg"}
							width={20}
							height={20}
							alt='dropdown'
							className=' rotate-90 '
						/>
					</div>
					{categoryopen && (
						<MobileCategoriesDropdown allcategories={allcategories} />
					)}
				</div>

				{/* <Link href={"/"}>
							<div className='pt-2 px-3 lg:px-3 ly-3 px-4bold hov5r:text-action border-t border-primary '>
								all products
							</div>
						</Link> */}
				<Link href={"/"}>
					<div className='py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary '>
						testing equipment
					</div>
				</Link>
				<Link href={"/"}>
					<div className='py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary '>
						service and calibration
					</div>
				</Link>

				{/* <Link href={"/brand"}>
							<div className='pt-2 px-3 lg:px-3 ly-3 px-4bold hov5r:text-action border-t border-primary '>
								Brand
							</div>
						</Link> */}
				<Link href={"/about-us"}>
					<div className='py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary '>
						About Us
					</div>
				</Link>
				<Link href={"/contact-us"}>
					<div className='py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary '>
						Contact us
					</div>
				</Link>
				<Link href={"/careers"}>
					<div className='py-3 px-4 text-[15px] font-bold hover:text-paragraph border-t border-primary '>
						Careers
					</div>
				</Link>
			</div>
		</div>
	);
};

export default MobileMenu;
