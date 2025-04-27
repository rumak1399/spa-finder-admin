"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";

// Define HomeSlider type to match the data structure
interface HomeSlider {
	_id: string;
	productLink: string;
	image: {
		url: string;
		alt: string;
	};
}

const BannerCarosel = ({ homeSliders }: { homeSliders: HomeSlider[] }) => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div className='w-full max-w-[1600px] max-h-screen h-[200px] sm:h-[300px] lg:h-[380px] mb-6 sm:mb-16'>
			<Carousel
				responsive={responsive}
				ssr={true}
				showDots={true}
				arrows={false}
				autoPlay={true}
				infinite={true}
			>
				{homeSliders &&
					homeSliders.length > 0 &&
					homeSliders.map((slider) => {
						return slider.productLink ? (
							<Link key={slider._id} href={slider.productLink}>
								<Image
									width={1920}
									height={900}
									style={{ objectFit: "cover" }}
									className='w-full max-w-screen max-h-full'
									src={slider.image.url}
									alt={slider.image.alt}
									loading='lazy'
								/>
							</Link>
						) : (
							<Image
								key={slider._id}
								width={1920}
								height={900}
								style={{ objectFit: "cover" }}
								className='w-full max-w-screen max-h-full'
								src={slider.image.url}
								alt={slider.image.alt}
								loading='lazy'
							/>
						);
					})}
			</Carousel>
		</div>
	);
};

export default BannerCarosel;
