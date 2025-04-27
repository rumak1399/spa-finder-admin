"use client";

import { Product } from "../cards/productCard";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartReducer/cartSlice";
import Link from "next/link";

const ProductActionButton = ({ product }: { product: Product }) => {
	const dispatch = useAppDispatch();

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
		<div className='w-full flex flex-col gap-2'>
			<div className='w-full flex gap-2'>
				<button
					onClick={() => handleOpenModal(product._id)}
					className='w-1/2 bg-gradient-to-r from-secondary to-action text-primary py-2 rounded-md text-xl cursor-pointer'
				>
					Enquiry Now
				</button>
				<button
					onClick={() => dispatch(addToCart({ product: product, quantity: 1 }))}
					className='w-1/2 bg-gradient-to-r from-secondary to-action text-primary py-2 rounded-md text-xl cursor-pointer'
				>
					Add To Cart
				</button>
			</div>
			<div>
				<button className='w-full bg-gradient-to-l from-secondary to-action text-primary py-2 rounded-md text-xl cursor-pointer'>
					<Link href={"/cart"}>Checkout Now</Link>
				</button>
			</div>
		</div>
	);
};

export default ProductActionButton;
