import { Product } from "@/components/cards/productCard";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
	product: Product;
	quantity: number;
};
export interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		EmptyCart: (state) => {
			state.items = [];
		},
		addToCart: (state, action: PayloadAction<CartItem>) => {
			let exits = false;

			if (state.items.length > 0) {
				state.items.forEach((item) => {
					if (item.product._id === action.payload.product._id) {
						exits = true;
					}
				});
				state.items = exits
					? state.items
					: (state.items = [...state.items, action.payload]);
			} else {
				state.items = [action.payload];
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(
				(Item) => Item.product._id !== action.payload
			);
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			state.items = state.items.map((item) => {
				if (item.product._id === action.payload) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				} else {
					return item;
				}
			});
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			state.items = state.items.map((item) => {
				if (item.product._id === action.payload) {
					if (item.quantity > 1) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				} else {
					return item;
				}
			});
		},
	},
});

export const {
	EmptyCart,
	addToCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
