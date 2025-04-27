"use client";

import { useState, useEffect, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard, { Product } from "../cards/productCard";

const Search = ({
	visible,
	setVisible,
}: {
	visible: boolean;

	setVisible: (prop: boolean) => void;
}) => {
	const [query, setQuery] = useState<string>(""); // Search query
	const [hints, setHints] = useState<string[]>([]); // Search suggestions
	const [products, setProducts] = useState<Product[]>([]); // Search results

	const didMount = useRef(false); // Prevent initial useEffect trigger

	// Fetch search hints with debouncing
	useEffect(() => {
		if (!didMount.current) {
			didMount.current = true;
			return; // Skip first effect run after mount
		}
		if (query.length === 0) return;

		if (!query.trim()) {
			setHints([]); // Clear hints if query is empty
			return;
		}

		const fetchHints = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/products/search-hint?query=${query}`
				);
				if (response.ok) {
					const data = await response.json();
					setHints(data.hints || []);
				}
			} catch (error) {
				console.error("Error fetching search hints:", error);
			}
		};
		fetchHints();
	}, [query]);

	// Fetch search results when clicking "Search Now"
	const handleSearch = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/products/search?title=${query}`
			);
			if (response.ok) {
				const data = await response.json();
				setProducts(data.products || []);
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	return (
		<div
			className={`w-full max-w-[360px] h-screen overflow-y-auto fixed top-0 ${
				visible ? "right-0" : "right-[-400px]"
			} z-[999999999] bg-primary transition-all duration-500 shadow-md`}
		>
			<div className='w-full h-15 p-4 flex justify-between items-center text-[14px] font-medium bg-gradient-to-l from-action to-secondary text-primary'>
				<span>Search Product</span>
				<button
					onClick={() => setVisible(false)}
					className='w-[26px] h-[26px] flex justify-center items-center text-[16px] bg-primary text-heading rounded-full cursor-pointer'
				>
					✕
				</button>
			</div>

			<div className={`flex flex-col gap-[10px] py-6 px-4 w-full `}>
				<div className='w-full min-w-[300px] mt-4'>
					<button
						className='w-full h-12 rounded-md text-primary bg-gradient-to-r from-secondary to-action flex justify-center items-center uppercase hover:shadow-md'
						onClick={() => handleSearch()}
					>
						Search Now
					</button>
				</div>
				<div className='relative w-full min-w-[300px]'>
					<input
						type='text'
						className='w-full  py-[10px] px-[15px] border border-borderColor rounded-md'
						placeholder='Enter product name'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						required
					/>
					<FontAwesomeIcon
						icon={faSearch}
						className='text-borderColor absolute top-[35%] right-4 cursor-pointer'
						onClick={() => handleSearch()}
					/>
					{/* Render hints */}
					{hints.length > 0 && (
						<div className='absolute top-full left-0 w-full bg-primary border border-borderColor rounded-md shadow-md z-10'>
							{hints.map((hint, index) => (
								<div
									key={index}
									className='px-4 py-2 cursor-pointer hover:bg-gray-100'
									onClick={() => {
										setQuery(hint);
										setHints([]);
									}}
								>
									{hint}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Render products */}
			<div className='w-full flex flex-col items-center'>
				{products.length > 0 ? (
					products.map((product) => (
						<ProductCard
							setVisible={setVisible}
							key={product._id}
							product={product}
						/>
					))
				) : (
					<p className='p-4 text-center'>No products found.</p>
				)}
			</div>
		</div>
	);
};

export default Search;
