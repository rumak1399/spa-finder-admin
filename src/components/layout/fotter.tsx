"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";

const Fotter: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleSubscribe = async (e: FormEvent) => {
		e.preventDefault();

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/subscribe`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);

			if (response.ok) {
				setSuccessMessage("Thank you for subscribing!");
				setEmail(""); // Clear the input field
				setErrorMessage("");
			} else {
				const errorData = await response.json();
				setErrorMessage(
					errorData.message || "Failed to subscribe. Please try again."
				);
			}
		} catch (error) {
			console.error("Error subscribing:", error);
			setErrorMessage("An error occurred. Please try again.");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return (
		<footer
			className='w-full h-[600px] sm:h-[500px] md:h-[500px] lg:h-[300px] 
        bg-[#252525] flex justify-center py-10 px-5'
		>
			<div className='w-full max-w-[1200px] flex gap-10 md:gap-6 justify-center flex-wrap'>
				<div className='w-fit max-w-[300px] flex flex-col gap-2'>
					<p className='w-full text-[15px] text-[#a7a7a7] '>
						Address : House # 74, 3rd Floor, Road # Lake Drive Road, Sector # 7,
						Uttara, Dhaka.
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] '>+8801670108772 </p>
					<p className='w-full text-[15px] text-[#a7a7a7] '>+8801712343916</p>
					<p className='w-full text-[15px] text-[#a7a7a7]'>
						info@multivisionbd.com
					</p>
				</div>
				<div className='w-fit max-w-[270px] flex flex-col gap-2'>
					<h2 className='font-bold text-[16px] uppercase text-primary '>
						Information
					</h2>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='#'>Terms & Conditions</Link>
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='#'>Delivery Policy</Link>
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='#'>Cancel & Returns</Link>
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='#'>Privacy Policy</Link>
					</p>
				</div>
				<div className='w-fit max-w-[170px] flex flex-col gap-2'>
					<h2 className='font-bold text-[16px] uppercase text-primary '>
						Information
					</h2>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='#'>Brands</Link>
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='/about-us'>About Us</Link>
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='/contact-us'>Contact Us</Link>
					</p>
					<p className='w-full text-[15px] text-[#a7a7a7] hover:text-primary'>
						<Link href='/careers'>Careers</Link>
					</p>
				</div>
				<div className='w-fit max-w-[270px] flex flex-col gap-2'>
					<h2 className='font-bold text-[16px] uppercase text-primary '>
						Subscribe
					</h2>
					<p className='w-full text-[15px] text-[#a7a7a7] '>
						Receive updates, hot deals, discounts sent straight to your inbox
						daily.
					</p>
					<form onSubmit={handleSubscribe} className='flex flex-col gap-2'>
						<div className='flex items-center'>
							<input
								className='w-[215px] h-[50px] px-4 py-3'
								type='email'
								required
								name='email'
								value={email}
								onChange={handleChange}
								placeholder='Enter your email'
							/>
							<button
								type='submit'
								className='w-[55px] h-[50px] text-xl font-extrabold bg-action text-heading flex justify-center items-center'
							>
								&#8594;
							</button>
						</div>
						{successMessage && (
							<p className='text-primary text-sm'>{successMessage}</p>
						)}
						{errorMessage && (
							<p className='text-primary text-sm'>{errorMessage}</p>
						)}
					</form>
				</div>
			</div>
		</footer>
	);
};

export default Fotter;
