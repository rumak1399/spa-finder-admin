"use client";

import Image from "next/image";
import React from "react";

export default function EnquiryFormDialog() {
	const handleCloseModal = (event: React.MouseEvent<HTMLDialogElement>) => {
		const modal = document.getElementById("enquryform");
		if (modal) {
			const rect = modal.getBoundingClientRect();
			const isInDialog =
				rect.top <= event.clientY &&
				event.clientY <= rect.top + rect.height &&
				rect.left <= event.clientX &&
				event.clientX <= rect.left + rect.width;
			if (!isInDialog) {
				modal.classList.add("top-[-1500px]");
				// @ts-expect-error Necessary for closing modal
				modal.close();
			}
		}
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const modal = document.getElementById("enquryform");
		const productId = modal?.getAttribute("data-product-id"); // Retrieve productId
		if (!productId) {
			alert("Product ID is missing.");
			return;
		}

		// Collect form data
		const formData = new FormData(event.currentTarget);
		const enquiryData = Object.fromEntries(formData.entries()); // Convert formData to an object
		enquiryData.productId = productId;

		try {
			// Make POST request to save enquiry
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/enquiries`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(enquiryData),
				}
			);

			const result = await response.json();
			if (response.ok) {
				alert("Enquiry submitted successfully!");
				event.currentTarget.reset(); // Reset form
				// Optionally close the dialog
				modal?.classList.add("top-[-1500px]");
				// @ts-expect-error Necessary for closing modal
				modal?.close();
			} else {
				alert(result.message || "Failed to submit enquiry.");
			}
		} catch (error) {
			console.error("Error submitting enquiry:", error);
			alert("An error occurred. Please try again later.");
		}
	};

	return (
		<dialog
			open={false}
			id='enquryform'
			data-product-id='12345' // Replace with dynamic product ID
			className='max-w-[90%] h-fit w-[950px] z-0 top-[-1500px] backdrop:bg-paragraph flex flex-col gap-8 items-center mt-16 pb-10 px-1 border border-borderColor rounded-md'
			onClick={(e) => handleCloseModal(e)}
		>
			<div className='w-full flex flex-wrap-reverse gap-8 justify-center rounded-md'>
				<form
					className='w-full h-fit min-h-[394px] p-6'
					onSubmit={handleFormSubmit}
				>
					<div className='w-full flex justify-center mb-5'>
						<Image
							width={400}
							height={250}
							src={"/logo.jpg"}
							alt='company logo'
						/>
					</div>
					<h3 className='uppercase text-center text-[27px] font-[400] mb-3'>
						Get a Free Quote
					</h3>
					<p className='text-center mb-3 text-[16px] text-paragraph'>
						Fill out the form below and a representative will contact you soon.
					</p>
					<div className='flex flex-col gap-[15px]'>
						<div className='flex gap-[30px] flex-wrap sm:flex-nowrap w-full justify-between'>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='firstName'
								placeholder='Your First Name'
								required
							/>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='lastName'
								placeholder='Your Last Name'
								required
							/>
						</div>
						<div className='flex gap-[30px] flex-wrap sm:flex-nowrap w-full justify-between'>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='phone'
								placeholder='Your Phone No.'
								required
							/>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='email'
								placeholder='Your Email'
								required
							/>
						</div>
						<div className='flex gap-[30px] flex-wrap sm:flex-nowrap w-full justify-between'>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='country'
								placeholder='Country'
								required
							/>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='city'
								placeholder='City'
								required
							/>
						</div>
						<div className='flex gap-[30px] flex-wrap sm:flex-nowrap w-full justify-between'>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='state'
								placeholder='State'
								required
							/>
							<input
								type='text'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								name='zip'
								placeholder='Zip Code'
								required
							/>
						</div>
						<textarea
							className='w-full min-h-[200px] py-[10px] px-[15px] border border-borderColor rounded-md ht-80'
							name='message'
							placeholder='Drop your message here and mention company name if any'
							required
						></textarea>
						<div className='mt-4'>
							<button
								type='submit'
								className='w-full h-12 rounded-md text-primary bg-gradient-to-l from-secondary to-action flex justify-center items-center uppercase hover:shadow-md hover:scale-105'
							>
								Submit Now
							</button>
						</div>
					</div>
				</form>
			</div>
		</dialog>
	);
}
