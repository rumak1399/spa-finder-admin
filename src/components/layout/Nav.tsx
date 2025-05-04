"use client";

import Image from "next/image";
import Link from "next/link";
import Search from "./search";
import { useState } from "react";
import MobileMenu from "./mobileMenu";
import Categoriesdropdown, { ICategory } from "./categoriesDropdwon";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/redux/store";

const Nav = ({
	allCategories,
	logoi,
}: {
	allCategories: ICategory[];
	logoi: string;
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [menuVisible, setMenuVisible] = useState<boolean>(false);

	const items = useAppSelector((state) => state.cart.items);
	const { data: session } = useSession();

	return (
		<>
			<nav className='w-full h-fit md:pl-10 bg-primary flex justify-center sticky top-0 z-[999999] shadow-md '>
				<div className='w-full h-fit max-w-[1200px] text-paragraph uppercase flex  xl:justify-between  items-center lg:flex-wrap relative'>
					<div className='w-1/2 lg:w-fit pl-2  py-2 flex justify-center gap-3 lg:justify-start mr-2'>
						<svg
							onClick={() => setMenuVisible(true)}
							xmlns='http://www.w3.org/2000/svg'
							xmlSpace='preserve'
							id='hamburger-menu1'
							x='0'
							y='0'
							version='1.1'
							viewBox='0 0 50 50'
							className='visible lg:hidden w-10 h-10 '
						>
							<path
								fill='#231F20'
								d='M8.667 15h30a1 1 0 1 0 0-2h-30a1 1 0 1 0 0 2zM8.667 37h30a1 1 0 1 0 0-2h-30a1 1 0 1 0 0 2zM8.667 26h30a1 1 0 1 0 0-2h-30a1 1 0 1 0 0 2z'
							></path>
						</svg>
						<Image
							// className=''
							width={260}
							height={90}
							src={logoi}
							alt='company logo '
						/>
					</div>
					<div className='hidden lg:flex h-10  flex-wrap'>
						<Link href={"/"}>
							<div className='pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[12px] font-bold hover:text-action'>
								Home
							</div>
						</Link>

						<div className='peer/cat pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[12px] font-bold hover:text-action after:border-[5px 0 5px 5px] after:border-t-heading  items-center'>
							<Link className='flex justify-between gap-2' href={"/"}>
								<span>Products</span>
								<Image
									src={"/next-arrow.svg"}
									width={15}
									height={15}
									alt='dropdown'
									className=' rotate-90'
								/>
							</Link>
						</div>

						<div className='absolute  top-[-1500px]  peer-hover/cat:top-12 hover:top-12  min-w-[240px] w-[300px] h-fit bg-gradient-to-r from-secondary to-action text-primary rounded-md z-[999999999] px-4 py-2'>
							<Categoriesdropdown allcategories={allCategories} />
						</div>

						<Link href={"/about-us"}>
							<div className='pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[12px] font-bold hover:text-action'>
								About Us
							</div>
						</Link>
						<Link href={"/contact-us"}>
							<div className='pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[12px] font-bold hover:text-action'>
								Contact us
							</div>
						</Link>
						<Link href={"/careers"}>
							<div className='pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[12px] font-bold hover:text-action'>
								Careers
							</div>
						</Link>
					</div>
					<div className='pr-[10px] md:pr-[30px] w-2/3 sm:w-[50%] md:w-[60%] lg:w-full xl:w-fit flex justify-end '>
						<Link href={"/cart"}>
							<div className='group/search pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[12px] font-bold text-action cursor-pointer'>
								<FontAwesomeIcon icon={faCartShopping} /> {items.length} items
							</div>
						</Link>
						<div
							onClick={() => {
								setVisible(true);
							}}
							className='group/search pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[10px] md:text-[12px] font-bold hover:text-action cursor-pointer flex  items-center'
						>
							<FontAwesomeIcon
								icon={faSearch}
								className='text-borderColor group-hover/search:text-action  mr-1'
							/>
							<span>Search</span>
						</div>

						{!session?.user ? (
							<Link href={"/login"}>
								<div className='group/user pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[10px] md:text-[12px] font-bold hover:text-action flex items-center'>
									<FontAwesomeIcon
										icon={faUser}
										className='text-borderColor group-hover/user:text-action  mr-2'
									/>
									<span>Login</span>
								</div>
							</Link>
						) : (
							<div
								onClick={() => {
									signOut();
								}}
								className='pt-2 px-[5px] lg:px-3 lg:pt-3 pb-2 text-[10px] md:text-[12px] font-bold hover:text-action cursor-pointer flex gap-1 items-center'
							>
								{session.user.image && (
									<Image
										width={20}
										height={20}
										className='rounded-full'
										src={session.user.image}
										alt='profile image'
									/>
								)}
								<span>Logout</span>
							</div>
						)}
					</div>
					<svg
						onClick={() => setMenuVisible(true)}
						xmlns='http://www.w3.org/2000/svg'
						xmlSpace='preserve'
						id='hamburger-menu'
						x='0'
						y='0'
						version='1.1'
						viewBox='0 0 50 50'
						className='visible sm:hidden w-10 h-10 '
					>
						<path
							fill='#231F20'
							d='M8.667 15h30a1 1 0 1 0 0-2h-30a1 1 0 1 0 0 2zM8.667 37h30a1 1 0 1 0 0-2h-30a1 1 0 1 0 0 2zM8.667 26h30a1 1 0 1 0 0-2h-30a1 1 0 1 0 0 2z'
						></path>
					</svg>
				</div>
			</nav>
			<MobileMenu
				allcategories={allCategories}
				menuvisible={menuVisible}
				setMenuVisible={setMenuVisible}
			/>
			<Search visible={visible} setVisible={setVisible} />
		</>
	);
};

export default Nav;
