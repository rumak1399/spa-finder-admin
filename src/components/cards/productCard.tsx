"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

interface Image {
	url: string;
	alt: string;
}

interface Brochure {
	url: string;
	filename: string;
}

export interface Product {
	_id: string; // Optional for new objects
	title: string;
	slug: string;
	description: string;
	image: Image;
	brochure?: Brochure; // Optional field
	price: number;
	discount: boolean;
	discountAmount: number;
	category: string; // References another model
	featured: boolean;
	newlyArrived: boolean;
	status: string;
	createdAt?: Date; // Added by Mongoose's timestamps option
	updatedAt?: Date; // Added by Mongoose's timestamps option
}

const ProductCard = ({
	product,
	setVisible,
}: {
	product: Product;
	setVisible?: (prop: boolean) => void;
}) => {
	const router = useRouter();
	const handleOpenModal = (id: string) => {
		const modal = document.getElementById("enquryform");
		if (modal) {
			// @ts-expect-error this nesecery for opening modal
			modal.showModal();
			modal.setAttribute("data-product-id", id);
			modal.classList.remove("top-[-1500px]");
		}
	};

	return (
		<div className='px-[10px] pb-3 w-[261px]  h-[435px]  bg-primary border border-borderColor  d flex flex-col justify-between  cursor-pointer rounded-md'>
			<div className='w-full h-[300px] flex justify-center items-center overflow-hidden '>
				<Image
					width={240}
					height={300}
					style={{ objectFit: "cover" }}
					className=''
					src={product.image?.url || "/logo.jpg"}
					alt={product.image?.alt || "placholder"}
				/>
			</div>

			<div className='flex justify-center flex-col '>
				<h2 className=' h-fit text-[13px] font-medium '>{product.title}</h2>
				{!product.price || product.price === 0 ? (
					<div className='text-[11px] mb-2'>Call for price</div>
				) : (
					<div className='text-[11px] mb-2 flex gap-2 '>
						<span>Price</span>
						<span className={`${product.discount ? "line-through" : ""} `}>
							{product.price} Taka
						</span>
						{product.discount && (
							<>
								<span>
									{product.price -
										(product.price * product.discountAmount) / 100}{" "}
									Taka
								</span>

								<span>Save {product.discountAmount} %</span>
							</>
						)}
					</div>
				)}
				<div className='w-full flex gap-2'>
					<button
						onClick={() => {
							if (setVisible) {
								setVisible(false);
								console.log("hit");
							}
							router.push(`/${product.slug}`);
						}}
						className='w-fit uppercase bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#00c6ff] text-[14px]  text-primary  py-2 px-[15px] rounded-[24px] '
					>
						View Details
					</button>
					<button
						onClick={() => handleOpenModal(product._id)}
						className=' uppercase bg-gradient-to-r from-secondary to-action text-primary hover:from-action hover:to-secondary text-[14px]   py-2 px-[15px] rounded-[24px] '
					>
						Enquiry
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
