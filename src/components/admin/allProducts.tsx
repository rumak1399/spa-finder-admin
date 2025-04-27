"use client";

import { IProduct } from "./main";
import AddProduct from "./addProduct";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import UpdateProduct from "./updateProductform";

const AllProducts = ({
	display,
	setDisplay,
	groupedProducts,
}: {
	groupedProducts: {
		published: IProduct[];
		unpublished: IProduct[];
		allProducts: IProduct[];
	};
	display: string;
	setDisplay: (prop: string) => void;
}) => {
	const [productfilterkey, setProductFilterkey] = useState<string>("all");

	const [selectedproduct, setSelectedproduct] = useState<
		IProduct | undefined
	>();

	const handleDelete = async (id: string) => {
		try {
			// Show confirmation dialog
			const isConfirmed = confirm(
				"Are you sure you want to delete this product?"
			);

			// If user cancels, return early
			if (!isConfirmed) {
				return;
			}

			// Proceed with deletion
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/products/${id}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			);
			const data = await res.json();

			// Handle response
			if (res.ok) {
				alert("Product Deleted successfully!");
			} else {
				alert(`Failed to delete product: ${data.message}`);
			}
		} catch (error) {
			console.error("Error deleting product:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className='w-full flex justify-center px-4 sm:px-10'>
			{display === "products" && (
				<div className='w-full border border-borderColor rounded-xl'>
					{/* Filters */}
					<div className='w-full h-12 px-4 py-2 flex gap-4 border-b border-borderColor'>
						<button
							className='text-secondary hover:underline'
							onClick={() => {
								setProductFilterkey("all");
							}}
						>
							All
						</button>
						<button
							className='text-secondary hover:underline'
							onClick={() => {
								setProductFilterkey("published");
							}}
						>
							Published
						</button>
						<button
							className='text-secondary hover:underline'
							onClick={() => {
								setProductFilterkey("unpublished");
							}}
						>
							UnPublished
						</button>
					</div>

					{/* Products Header */}
					<div className='w-full h-10 px-4 flex gap-4 items-center bg-secondary text-primary font-semibold'>
						<div className='w-[40%]'>Product</div>
						<div className='w-[15%]'>Price</div>
						<div className='w-[15%]'>Status</div>
						<div className='w-[15%]'>Category</div>
						<div className='w-[15%] text-center'>Actions</div>
					</div>

					{productfilterkey == "all" && (
						<>
							{groupedProducts.allProducts &&
								groupedProducts.allProducts.length > 0 &&
								groupedProducts.allProducts.map((p, i) => (
									<div
										className='w-full flex items-center gap-4 px-4 py-2 border-t border-borderColor hover:bg-gray-100'
										key={i}
									>
										{/* Product Info */}
										<div className='w-[40%] flex items-center gap-4'>
											<Image
												src={p.image?.url?.toString() || "/productImage.jpg"}
												alt={p.image?.alt?.toString()}
												width={50}
												height={50}
												className='rounded-md'
											/>
											<div>
												<p className='font-medium text-heading truncate'>
													{p.title}
												</p>
											</div>
										</div>

										{/* Price */}
										<div className='w-[15%] text-heading'>
											{p.discount
												? `${p.price - (p.price * p.discountAmount) / 100} Taka`
												: `${p.price} Taka`}
										</div>

										{/* Status */}
										<div className='w-[15%]'>
											<span
												className={`px-2 py-1 text-xs rounded ${
													p.status === "published"
														? "bg-green-100 text-green-600"
														: "bg-red-100 text-red-600"
												}`}
											>
												{p.status}
											</span>
										</div>

										{/* Category */}
										{p.category && (
											<div className='w-[15%] text-paragraph'>
												{p.category.name}
											</div>
										)}

										{/* Actions */}
										<div className='w-[15%] flex justify-center gap-2'>
											<button
												onClick={() => {
													setSelectedproduct(p);
													setDisplay("updateProduct");
												}}
												className='flex items-center gap-1 px-2 py-1 text-sm bg-action text-primary rounded hover:bg-opacity-90'
											>
												<FontAwesomeIcon icon={faEdit} />
												Edit
											</button>
											<button
												onClick={() => handleDelete(p._id!)}
												className='flex items-center gap-1 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
											>
												<FontAwesomeIcon icon={faTrashAlt} />
												Delete
											</button>
										</div>
									</div>
								))}
						</>
					)}
					{productfilterkey == "unpublished" && (
						<>
							{groupedProducts.unpublished &&
								groupedProducts.unpublished.length > 0 &&
								groupedProducts.unpublished.map((p, i) => (
									<div
										className='w-full flex items-center gap-4 px-4 py-2 border-t border-borderColor hover:bg-gray-100'
										key={i}
									>
										{/* Product Info */}
										<div className='w-[40%] flex items-center gap-4'>
											<Image
												src={p.image.url.toString()}
												alt={p.image.alt.toString()}
												width={50}
												height={50}
												className='rounded-md'
											/>
											<div>
												<p className='font-medium text-heading truncate'>
													{p.title}
												</p>
											</div>
										</div>

										{/* Price */}
										<div className='w-[15%] text-heading'>
											{p.discount
												? `${p.price - (p.price * p.discountAmount) / 100} Taka`
												: `${p.price} Taka`}
										</div>

										{/* Status */}
										<div className='w-[15%]'>
											<span
												className={`px-2 py-1 text-xs rounded ${
													p.status === "draft"
														? "bg-green-100 text-green-600"
														: "bg-red-100 text-red-600"
												}`}
											>
												{p.status}
											</span>
										</div>

										{/* Category */}
										{p.category && (
											<div className='w-[15%] text-paragraph'>
												{p.category.name}
											</div>
										)}

										{/* Actions */}
										<div className='w-[15%] flex justify-center gap-2'>
											<button
												onClick={() => {
													setSelectedproduct(p);
													setDisplay("updateProduct");
												}}
												className='flex items-center gap-1 px-2 py-1 text-sm bg-action text-primary rounded hover:bg-opacity-90'
											>
												<FontAwesomeIcon icon={faEdit} />
												Edit
											</button>
											<button
												onClick={() => handleDelete(p._id!)}
												className='flex items-center gap-1 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
											>
												<FontAwesomeIcon icon={faTrashAlt} />
												Delete
											</button>
										</div>
									</div>
								))}
						</>
					)}
					{productfilterkey === "published" && (
						<>
							{groupedProducts.published &&
								groupedProducts.published.length > 0 &&
								groupedProducts.published.map((p, i) => (
									<div
										className='w-full flex items-center gap-4 px-4 py-2 border-t border-borderColor hover:bg-gray-100'
										key={i}
									>
										{/* Product Info */}
										<div className='w-[40%] flex items-center gap-4'>
											<Image
												src={p.image.url.toString()}
												alt={p.image.alt.toString()}
												width={50}
												height={50}
												className='rounded-md'
											/>
											<div>
												<p className='font-medium text-heading truncate'>
													{p.title}
												</p>
											</div>
										</div>

										{/* Price */}
										<div className='w-[15%] text-heading'>
											{p.discount
												? `${p.price - (p.price * p.discountAmount) / 100} Taka`
												: `${p.price} Taka`}
										</div>

										{/* Status */}
										<div className='w-[15%]'>
											<span
												className={`px-2 py-1 text-xs rounded ${
													p.status === "published"
														? "bg-green-100 text-green-600"
														: "bg-red-100 text-red-600"
												}`}
											>
												{p.status}
											</span>
										</div>

										{/* Category */}
										{p.category && (
											<div className='w-[15%] text-paragraph'>
												{p.category.name}
											</div>
										)}

										{/* Actions */}
										<div className='w-[15%] flex justify-center gap-2'>
											<button
												onClick={() => {
													setSelectedproduct(p);
													setDisplay("updateProduct");
												}}
												className='flex items-center gap-1 px-2 py-1 text-sm bg-action text-primary rounded hover:bg-opacity-90'
											>
												<FontAwesomeIcon icon={faEdit} />
												Edit
											</button>
											<button
												onClick={() => handleDelete(p._id!)}
												className='flex items-center gap-1 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
											>
												<FontAwesomeIcon icon={faTrashAlt} />
												Delete
											</button>
										</div>
									</div>
								))}
						</>
					)}
				</div>
			)}

			{/* Add or Update Product Form */}
			{display === "addProduct" && <AddProduct setDisplay={setDisplay} />}
			{display === "updateProduct" && selectedproduct && (
				<UpdateProduct
					setDisplay={setDisplay}
					initialProduct={selectedproduct}
				/>
			)}
		</div>
	);
};

export default AllProducts;
