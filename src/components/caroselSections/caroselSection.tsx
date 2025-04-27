"use client";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import ProductCard, { Product } from "../cards/productCard";
const ProductCarosel = ({
	sectiontitle,
	products,
}: {
	sectiontitle: string;
	products: Product[];
}) => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 10000, min: 1500 },
			items: 4,
			slidesToSlide: 3,
		},
		desktop: {
			breakpoint: { max: 1500, min: 1200 },
			items: 4,
			slidesToSlide: 3,
		},
		smallDesktop: {
			breakpoint: { max: 1200, min: 900 },
			items: 4,
			slidesToSlide: 2,
		},
		tablet: {
			breakpoint: { max: 900, min: 500 },
			items: 3,
			slidesToSlide: 2,
		},
		mobile: {
			breakpoint: { max: 500, min: 0 },
			items: 1,
		},
	};

	console.log("p", products);

	return (
		<section className='w-full h-[600px] '>
			<h1 className='pl-8 uppercase mb-3 text-heading text-[27px] text-center'>
				{sectiontitle}
			</h1>
			<div className='w-full h-fit'>
				<Carousel
					responsive={responsive}
					ssr={true}
					infinite={true}
					autoPlaySpeed={1500}
					swipeable={true}
					className='py-4 '
					itemClass='flex justify-center '
				>
					{products &&
						products.length > 0 &&
						products.map((p) => {
							return <ProductCard key={p._id + sectiontitle} product={p} />;
						})}
				</Carousel>
			</div>
		</section>
	);
};

export default ProductCarosel;
