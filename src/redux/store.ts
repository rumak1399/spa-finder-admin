"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { cartReducer } from "./cartReducer/cartSlice";
const isClient = typeof window !== "undefined";
const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null);
		},
		setItem(_key: string, value: number) {
			return Promise.resolve(value);
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

const storage = isClient ? createWebStorage("local") : createNoopStorage();

const authPersistConfig = {
	key: "cart",
	storage: isClient ? storage : createNoopStorage(),
};

const persistedReducer = persistReducer(authPersistConfig, cartReducer);

const rootReducer = combineReducers({
	cart: persistedReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
