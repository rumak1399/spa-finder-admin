"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { ImageUploader } from "./imageUploader";

interface Brand {
	_id: string;
	name: string;
	image: {
		url: string;
		alt: string;
	};
}

const BrandsAdmin: React.FC = () => {
	const [brands, setBrands] = useState<Brand[]>([]);
	const [brandName, setBrandName] = useState<string>("");
	const [brandImage, setBrandImage] = useState<string | null>(null);
	const [imageAlt, setImageAlt] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch Brands from the server
	useEffect(() => {
		const fetchBrands = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/brands`
				);
				const data = await response.json();
				setBrands(data.brands);
			} catch (err) {
				console.error(err);
				setError("Failed to load brands.");
			}
		};

		fetchBrands();
	}, []);

	// Handle form submission
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!brandName || !brandImage || !imageAlt) {
			setError("All fields are required.");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/brands`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: brandName,
						image: {
							url: brandImage,
							alt: imageAlt,
						},
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to upload brand.");
			}

			const data = await response.json();
			setBrands((prev) => [...prev, data.brand]);
			setBrandName("");
			setBrandImage(null);
			setImageAlt("");
		} catch (err) {
			console.error(err);
			setError("Failed to upload brand.");
		} finally {
			setLoading(false);
		}
	};

	// Handle delete
	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/brands/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to delete brand.");
			}

			setBrands((prev) => prev.filter((brand) => brand._id !== id));
		} catch (err) {
			console.error(err);
			setError("Failed to delete brand.");
		}
	};

	return (
		<div className='w-full flex flex-col items-center px-10'>
			<h1 className='text-2xl font-bold mb-6'>Manage Customar Brands</h1>

			{/* Error Message */}
			{error && <div className='text-red-500 mb-4'>{error}</div>}

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-lg p-4 border rounded'
			>
				<div className='mb-4'>
					<label htmlFor='brandName' className='block mb-2 font-medium'>
						Brand Name
					</label>
					<input
						type='text'
						id='brandName'
						value={brandName}
						onChange={(e) => setBrandName(e.target.value)}
						className='w-full px-4 py-2 border rounded'
						placeholder='Enter brand name'
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
					<ImageUploader onUploadSuccess={(url) => setBrandImage(url)} />
					{brandImage && (
						<div className='mt-2'>
							<Image
								src={brandImage}
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

			{/* Brands List */}
			<div className='w-full mt-8'>
				{brands.map((brand) => (
					<div
						key={brand._id}
						className='flex items-center justify-between p-4 border rounded mb-4'
					>
						<div className='flex items-center'>
							<Image
								src={brand.image.url}
								alt={brand.image.alt}
								width={100}
								height={100}
								className='rounded'
							/>
							<div className='ml-4'>
								<div className='text-lg font-medium'>{brand.name}</div>
								<div className='text-gray-600'>{brand.image.alt}</div>
							</div>
						</div>
						<button
							onClick={() => handleDelete(brand._id)}
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

export default BrandsAdmin;
