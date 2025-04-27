"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useState, useEffect } from "react";

// Define Brand type to match the data structure
interface Brand {
	_id: string;
	name: string;
	image: {
		url: string;
		alt: string;
	};
}

const BrandsCarousel = () => {
	const [brands, setBrands] = useState<Brand[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch all Brands from the API
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
				setError("Failed to load brand items.");
			} finally {
				setLoading(false);
			}
		};

		fetchBrands();
	}, []);

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 6,
		},
		desktop: {
			breakpoint: { max: 1500, min: 1024 },
			items: 6,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 4,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2,
		},
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className='w-full max-w-[1200px] max-h-screen h-[200px] sm:h-[300px] lg:h-[500px] mb-6 sm:mb-16'>
			<Carousel
				responsive={responsive}
				ssr={true}
				showDots={false}
				arrows={false}
				autoPlay={true}
				infinite={true}
			>
				{brands &&
					brands.length > 0 &&
					brands.map((brand) => (
						<div
							key={brand._id}
							className='w-[160px] h-[160px] border border-borderColor flex justify-center items-center mx-2 p-1'
						>
							<Image
								width={150}
								height={150}
								style={{ objectFit: "contain" }}
								className='  '
								src={brand.image.url}
								alt={brand.image.alt}
								loading='lazy'
							/>
						</div>
					))}
			</Carousel>
		</div>
	);
};

export default BrandsCarousel;
