"use client";

import "react-multi-carousel/lib/styles.css";

import BrandsCarousel from "../home/brands/brands-carosel";
const OurCustomarsCarosel = ({ sectiontitle }: { sectiontitle: string }) => {
	return (
		<section className='w-full h-[300px] '>
			<h1 className='pl-8 text-center uppercase mb-3 text-heading text-[27px]'>
				{sectiontitle}
			</h1>
			<div className='w-full h-fit'>
				<BrandsCarousel />
			</div>
		</section>
	);
};

export default OurCustomarsCarosel;
