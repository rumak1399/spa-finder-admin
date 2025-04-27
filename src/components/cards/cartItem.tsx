import { useAppDispatch } from "@/redux/store";
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
	type CartItem,
} from "@/redux/cartReducer/cartSlice";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const CartItemCard = ({ Item }: { Item: CartItem }) => {
	const dispatch = useAppDispatch();

	return (
		<div className='w-full min-h-[100px] flex items-center gap-3 p-3 border-b border-skaleton bg-primary text-secondary rounded-md relative'>
			{/* Product Info */}
			<div className='w-[30%] flex flex-col items-center text-center'>
				<div className='text-sm font-semibold break-words'>
					{Item.product.title}
				</div>
				<Image
					width={75}
					height={75}
					src={Item.product.image.url}
					alt={Item.product.image.alt}
					className='rounded-md border border-skaleton'
				/>
			</div>

			{/* Price */}
			<div className='w-[15%] text-center font-semibold'>
				BDT{" "}
				{Item.product.discount
					? Item.product.price -
					  (Item.product.price * Item.product.discountAmount) / 100
					: Item.product.price}{" "}
				Taka
			</div>

			{/* Quantity */}
			<div className='w-[15%] flex items-center gap-2 justify-center'>
				<button
					onClick={() => dispatch(decreaseQuantity(Item.product._id!))}
					className='w-6 h-6 flex items-center justify-center bg-secondary text-primary rounded-md text-sm font-bold hover:bg-action focus:outline-none'
					aria-label='Decrease quantity'
				>
					-
				</button>
				<span className='text-center font-semibold'>{Item.quantity}</span>
				<button
					onClick={() => dispatch(increaseQuantity(Item.product._id!))}
					className='w-6 h-6 flex items-center justify-center bg-secondary text-primary rounded-md text-sm font-bold hover:bg-action focus:outline-none'
					aria-label='Increase quantity'
				>
					+
				</button>
			</div>

			{/* Total */}
			<div className='w-[12%] text-center font-semibold'>
				{(Item.product.discount
					? (Item.product.price -
							(Item.product.price * Item.product.discountAmount) / 100) *
					  Item.quantity
					: Item.product.price * Item.quantity
				).toFixed(2)}{" "}
				Taka
			</div>

			{/* Remove Button */}
			<div
				onClick={() => dispatch(removeFromCart(Item.product._id!))}
				className='absolute top-3 right-3 text-secondary hover:text-action cursor-pointer text-lg focus:outline-none'
				aria-label='Remove item from cart'
			>
				<FontAwesomeIcon icon={faClose} />
			</div>
		</div>
	);
};

export default CartItemCard;
