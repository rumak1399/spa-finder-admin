"use client";

import React, { useState, useEffect } from "react";
import { ImageUploader } from "./imageUploader";
import { PdfUploader } from "./pdfUploader";
import { ICategory } from "./allCategories";
import { IProduct } from "./main";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProduct({
	initialProduct,
	setDisplay,
}: {
	initialProduct: IProduct;
	setDisplay: (prop: string) => void;
}) {
	const [name, setName] = useState(initialProduct.title);
	const [price, setPrice] = useState<number | undefined>(initialProduct.price);
	const [discount, setDiscount] = useState(initialProduct.discount);
	const [discountAmount, setDiscountAmount] = useState<number | undefined>(
		initialProduct.discountAmount
	);
	const [status, setStatus] = useState<boolean>(
		initialProduct.status === "published" ? true : false
	);
	const [featured, setFeatured] = useState(initialProduct.featured);
	const [newlyArrived, setNewlyArrived] = useState(initialProduct.newlyArrived);

	const [specification, setSpecification] = useState<string>(
		initialProduct.specification
	);
	const [description, setDescription] = useState(initialProduct.description);
	const [category, setCategory] = useState<{ id: string; path: string }>({
		id: initialProduct.category._id,
		path: initialProduct.slug,
	});
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [mainImage, setMainImage] = useState(initialProduct.image.url);
	const [pdf, setPdf] = useState(initialProduct.brochure?.url);
	const [pdfName, setPdfName] = useState(initialProduct.brochure?.filename);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [slugPreview, setSlugPreview] = useState<string>("");
	const router = useRouter();
	const fetchCategories = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories`
			);
			const data = await response.json();
			if (response.ok) {
				setCategories(data.categories);
			} else {
				setError(data.message || "Failed to fetch categories.");
			}
		} catch (err) {
			console.error("Error fetching categories:", err);
			setError("An error occurred while fetching categories.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if (slugPreview !== "") {
			if (category.path && name) {
				const formattedName = name
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-+|-+$/g, "");
				setSlugPreview(`${category.path}/${formattedName}`);
			} else {
			}
		} else {
			const path = initialProduct.slug.split("/") || ["a", "b"];
			const spath =
				path.length > 1 ? path.slice(0, path.length - 1).join("/") : path[0];
			if (path.length > 0) {
				setSlugPreview(initialProduct.slug);
				setCategory({ id: category.id, path: spath || "" });
			}
		}
	}, [category, name]);

	const renderCategoryOptions = (categories: ICategory[], parentPath = "") => {
		return categories.map((cat) => {
			const currentPath = parentPath ? `${parentPath}/${cat.slug}` : cat.slug;
			return (
				<React.Fragment key={cat._id}>
					<option
						value={cat._id}
						data-path={currentPath}
						defaultChecked={cat._id === initialProduct.category._id}
					>
						{"—".repeat(currentPath.split("/").length - 1)} {cat.name}
					</option>
					{cat.children && renderCategoryOptions(cat.children, currentPath)}
				</React.Fragment>
			);
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!category.id) {
			alert("Please select a category.");
			return;
		}

		const productData = {
			title: name,
			specification,
			description,
			price,
			discount,
			discountAmount,
			category: category.id,
			status: status ? "published" : "draft",
			image: { url: mainImage || "", alt: name },
			brochure: { url: pdf || "", filename: pdfName },
			featured,
			newlyArrived,
			slug: slugPreview,
		};

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/products/${initialProduct._id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(productData),
				}
			);
			const data = await res.json();

			if (res.ok) {
				setDisplay("products");
				router.refresh();
			} else {
				alert(`Failed to update product: ${data.message}`);
			}
		} catch (error) {
			console.error("Error updating product:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<>
			{loading && <p>Loading categories...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			{categories && (
				<form
					className='w-full max-w-[84%] text-secondary text-lg flex justify-center'
					onSubmit={handleSubmit}
				>
					<div className='w-full'>
						{/* Main Image Upload */}
						<div className='w-full flex gap-2 mb-4'>
							<div>
								<label htmlFor='file'>Main Image</label>
								<img
									className='min-w-[260px] h-[360px] rounded-md border border-borderColor my-1'
									src={mainImage}
									alt='Main'
								/>
								<ImageUploader onUploadSuccess={(link) => setMainImage(link)} />
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='pdf'>Product brochure</label>
								{pdf ? (
									<div className='w-[260px] h-[360px] rounded-md border border-borderColor my-1 flex flex-col justify-center break-all items-center p-2 gap-2'>
										<FontAwesomeIcon icon={faFilePdf} className='w-20 h-20 ' />
										{pdfName}
									</div>
								) : (
									<div className='min-w-[260px] h-[360px] rounded-md border border-borderColor my-1 flex justify-center items-center flex-col'>
										<FontAwesomeIcon icon={faFilePdf} className='w-20 h-20 ' />
									</div>
								)}
								<PdfUploader
									setPdfName={setPdfName}
									onUploadSuccess={(link) => setPdf(link)}
								/>
							</div>
						</div>
						{/* Product Details */}
						<div className='mb-4'>
							<label htmlFor='title'>Product Name</label>
							<input
								className='w-full h-10 rounded-md border border-bcollor pl-3'
								id='title'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						{/* Price and Discount */}
						<div className='flex gap-4 mb-4'>
							<div className='flex-1'>
								<label htmlFor='price'>Price</label>
								<input
									className='w-full h-10 rounded-md border border-bcollor pl-3'
									id='price'
									type='number'
									value={price}
									onChange={(e) => setPrice(Number(e.target.value))}
									required
								/>
							</div>
							<div className='flex-1'>
								<label htmlFor='discountAmount'>
									Discount Amount By Percentage
								</label>
								<input
									className='w-full h-10 rounded-md border border-bcollor pl-3'
									id='discountAmount'
									type='number'
									value={discountAmount}
									onChange={(e) => setDiscountAmount(Number(e.target.value))}
									disabled={!discount}
								/>
							</div>
						</div>

						{/* Category Selection with Hierarchy */}
						<div className='mb-4'>
							<label htmlFor='category'>Category</label>
							<select
								className='w-full h-10 rounded-md border border-bcollor pl-3'
								id='category'
								value={category.id}
								onChange={(e) => {
									const selectedOption =
										e.target.options[e.target.selectedIndex];
									const path = selectedOption.getAttribute("data-path");
									setCategory({ id: e.target.value, path: path || "" });
								}}
								required
							>
								<option value='' disabled>
									Select a category
								</option>
								{renderCategoryOptions(categories)}
							</select>
						</div>

						{/* Slug Preview */}
						<div className='mb-4'>
							<label>Generated Slug (URL)</label>
							<p className='text-gray-500'>
								{slugPreview ? `/${slugPreview}` : "Slug will appear here"}
							</p>
						</div>
						<div className='mb-4'>
							<label htmlFor='description'>Specification</label>
							<textarea
								className='w-full rounded-md border border-bcollor p-3'
								id='specification'
								name='specification'
								rows={4}
								value={specification}
								onChange={(e) => setSpecification(e.target.value)}
							/>
						</div>
						{/* Description */}
						<div className='mb-4'>
							<label htmlFor='description'>Description</label>
							<textarea
								className='w-full rounded-md border border-bcollor p-3'
								id='description'
								rows={4}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</div>

						{/* Status and Discount */}
						<div className='mb-4 flex items-center'>
							<input
								id='discount'
								type='checkbox'
								checked={discount}
								onChange={(e) => setDiscount(e.target.checked)}
							/>
							<label htmlFor='discount' className='ml-2'>
								Discount Available
							</label>
						</div>
						<div className='mb-4 flex items-center'>
							<input
								id='featured'
								type='checkbox'
								checked={featured}
								onChange={(e) => setFeatured(e.target.checked)}
							/>
							<label htmlFor='featured' className='ml-2'>
								Featured
							</label>
						</div>
						<div className='mb-4 flex items-center'>
							<input
								id='newlyarrived'
								type='checkbox'
								checked={newlyArrived}
								onChange={(e) => setNewlyArrived(e.target.checked)}
							/>
							<label htmlFor='newlyarrived' className='ml-2'>
								Newly Arrived
							</label>
						</div>
						<div className='mb-4 flex items-center'>
							<input
								id='status'
								type='checkbox'
								checked={status}
								onChange={(e) => setStatus(e.target.checked)}
							/>
							<label htmlFor='status' className='ml-2'>
								Publish
							</label>
						</div>

						{/* Submit Button */}
						<div className='flex gap-2 justify-end'>
							<button
								onClick={() => setDisplay("products")}
								className='px-6 rounded-md text-primary text-2xl bg-action'
							>
								Cancel
							</button>

							<button
								type='submit'
								className='px-6 rounded-md text-primary text-2xl bg-action'
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</>
	);
}
