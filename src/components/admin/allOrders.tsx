"use client";

import React, { useEffect, useState } from "react";

interface IOrder {
	_id: string;
	items: {
		product: {
			title: string;
			price: number;
			discount?: boolean;
			discountAmount: number;
		};
		quantity: number;
	}[];
	orderNumber: number;
	total: number;
	status: string;
	customer: {
		mainAddress: {
			name: string;
			email: string;
			phone: string;
			address: string;
			city: string;
			zip: string;
			country: string;
		};
		shippingAddress?: {
			name: string;
			email: string;
			phone: string;
			address: string;
			city: string;
			zip: string;
			country: string;
		};
		useSameAddressForShipping: boolean;
	};
	createdAt: string;
}

const ManageOrders = () => {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/orders`,
					{ method: "GET" }
				);
				const data = await response.json();
				setOrders(data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const handleStatusChange = async (orderId: string, newStatus: string) => {
		try {
			await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/orders/${orderId}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ status: newStatus }),
				}
			);
			setOrders((prevOrders) =>
				prevOrders.map((order) =>
					order._id === orderId ? { ...order, status: newStatus } : order
				)
			);
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	};

	const handleDeleteOrder = async (orderId: string) => {
		try {
			await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/orders/${orderId}`,
				{ method: "DELETE" }
			);
			setOrders((prevOrders) =>
				prevOrders.filter((order) => order._id !== orderId)
			);
		} catch (error) {
			console.error("Error deleting order:", error);
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<p className='text-lg font-semibold text-secondary'>
					Loading orders...
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-primary p-6'>
			<h1 className='text-2xl font-bold text-heading mb-6'>Manage Orders</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{orders.map((order) => (
					<div
						key={order._id}
						className='bg-white shadow-lg rounded-lg p-6 border border-borderColor'
					>
						<h2 className='text-lg font-bold text-paragraph'>
							Order #{order.orderNumber}
						</h2>
						<p className='text-sm text-paragraph'>
							Total:{" "}
							<span className='text-action'>
								BDT {order.total.toFixed(2)} Taka
							</span>
						</p>
						<p className='text-sm text-paragraph'>
							Status:{" "}
							<span className='font-semibold'>
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</span>
						</p>
						<div className='mt-4'>
							<h3 className='text-md font-semibold text-heading'>Customer</h3>
							<p className='text-sm text-paragraph'>
								{order.customer.mainAddress.name}
							</p>
							<p className='text-sm text-paragraph'>
								{order.customer.mainAddress.email}
							</p>
						</div>
						<div className='mt-4'>
							<h3 className='text-md font-semibold text-heading'>Items</h3>
							{order.items.map((item, index) => (
								<p
									key={index}
									className='text-sm text-paragraph flex justify-between'
								>
									<span>{item.product.title}</span>
									<span>x{item.quantity}</span>
								</p>
							))}
						</div>
						<div className='mt-4 flex justify-between gap-2'>
							<select
								value={order.status}
								onChange={(e) => handleStatusChange(order._id, e.target.value)}
								className='h-10 px-2 border border-borderColor rounded-md text-paragraph'
							>
								<option value='Proccessing'>Proccessing</option>
								<option value='shipping'>Shipping</option>
								<option value='delivered'>Delivered</option>
								<option value='canceled'>Canceled</option>
							</select>
							<button
								onClick={() => handleDeleteOrder(order._id)}
								className='h-10 px-4 text-primary bg-secondary rounded-md hover:bg-secondary/90'
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageOrders;
