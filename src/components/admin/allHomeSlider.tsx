"use client";

import React, { useState, useEffect, FormEvent } from "react";

import Image from "next/image";
import { ImageUploader } from "./imageUploader";
import Link from "next/link";
import { revalidatePath } from "next/cache";

interface HomeSlider {
	_id: string;
	productLink: string;
	image: {
		url: string;
		alt: string;
	};
}

const HomeSliderAdmin: React.FC = () => {
	const [homeSliders, setHomeSliders] = useState<HomeSlider[]>([]);
	const [productLink, setProductLink] = useState<string>("");
	const [mainImage, setMainImage] = useState<string | null>(null);
	const [imageAlt, setImageAlt] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch HomeSlider items from the server
	useEffect(() => {
		const fetchHomeSliders = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/home-slider`
				);
				const data = await response.json();
				setHomeSliders(data.homeSliders);
			} catch (err) {
				console.error(err);
				setError("Failed to load HomeSlider items.");
			}
		};

		fetchHomeSliders();
	}, []);

	// Handle form submission
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!mainImage || !imageAlt) {
			setError("All fields are required.");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/home-slider`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						productLink,
						image: {
							url: mainImage,
							alt: imageAlt,
						},
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to upload HomeSlider.");
			}

			const data = await response.json();
			setHomeSliders((prev) => [...prev, data.homeSlider]);
			setProductLink("");
			setMainImage(null);
			setImageAlt("");
			revalidatePath("/");
		} catch (err) {
			console.error(err);
			setError("Failed to upload HomeSlider.");
		} finally {
			setLoading(false);
		}
	};

	// Handle delete
	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/home-slider/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to delete HomeSlider.");
			}
			revalidatePath("/");
			setHomeSliders((prev) => prev.filter((slider) => slider._id !== id));
		} catch (err) {
			console.error(err);
			setError("Failed to delete HomeSlider.");
		}
	};

	return (
		<div className='w-full flex flex-col items-center px-10'>
			<h1 className='text-2xl font-bold mb-6'>Manage HomeSlider</h1>

			{/* Error Message */}
			{error && <div className='text-red-500 mb-4'>{error}</div>}

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-lg p-4 border rounded'
			>
				<div className='mb-4'>
					<label htmlFor='productLink' className='block mb-2 font-medium'>
						Target Link (Optional)
					</label>
					<input
						type='text'
						id='productLink'
						value={productLink}
						onChange={(e) => setProductLink(e.target.value)}
						className='w-full px-4 py-2 border rounded'
						placeholder='Enter product link'
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='imageAlt' className='block mb-2 font-medium'>
						Image Alt Text
					</label>
					<input
						type='text'
						id='imageAlt'
						value={imageAlt}
						onChange={(e) => setImageAlt(e.target.value)}
						className='w-full px-4 py-2 border rounded'
						placeholder='Enter image alt text'
					/>
				</div>

				<div className='mb-4'>
					<label className='block mb-2 font-medium'>Upload Image</label>
					<ImageUploader onUploadSuccess={(link) => setMainImage(link)} />
					{mainImage && (
						<div className='mt-2'>
							<Image
								src={mainImage}
								alt={imageAlt || "Uploaded Image"}
								width={100}
								height={100}
							/>
						</div>
					)}
				</div>

				<button
					type='submit'
					className='w-full px-4 py-2 bg-secondary text-primary rounded hover:bg-blue-700'
					disabled={loading}
				>
					{loading ? "Saving..." : "Save"}
				</button>
			</form>

			{/* HomeSlider List */}
			<div className='w-full mt-8'>
				{homeSliders.map((slider) => (
					<div
						key={slider._id}
						className='flex items-center justify-between p-4 border rounded mb-4'
					>
						<div className='flex items-center'>
							<Image
								src={slider.image.url}
								alt={slider.image.alt}
								width={400}
								height={400}
								className='rounded'
							/>
							<div className='ml-4'>
								<div className='text-lg font-medium'>{slider.image.alt}</div>
								<div className='text-blue-600 underline'>
									{slider.productLink ? (
										<Link href={slider.productLink}>slider.productLink</Link>
									) : (
										"No target link was added for this Image "
									)}
								</div>
							</div>
						</div>
						<button
							onClick={() => handleDelete(slider._id)}
							className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomeSliderAdmin;
