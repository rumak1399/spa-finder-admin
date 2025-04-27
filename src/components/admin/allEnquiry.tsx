"use client";

import React, { useEffect, useState } from "react";

interface Enquiry {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	country: string;
	city: string;
	state: string;
	zip: string;
	message: string;
	productId: {
		title: string;
		price: number;
		description: string;
		image: { url: string; alt: string };
	};
}

export default function AllEnquiries() {
	const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchEnquiries = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/enquiries`,
				{ method: "GET" }
			);
			if (response.ok) {
				const data = await response.json();
				setEnquiries(data.enquiries);
			} else {
				alert("Failed to fetch enquiries.");
			}
		} catch (error) {
			console.error("Error fetching enquiries:", error);
			alert("An error occurred while fetching enquiries.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEnquiries();
	}, []);

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this enquiry?")) return;

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/enquiries/${id}`,
				{
					method: "DELETE",
				}
			);
			if (response.ok) {
				alert("Enquiry deleted successfully.");
				setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id));
			} else {
				alert("Failed to delete enquiry.");
			}
		} catch (error) {
			console.error("Error deleting enquiry:", error);
			alert("An error occurred while deleting the enquiry.");
		}
	};

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-4'>All Enquiries</h1>
			{loading ? (
				<p>Loading enquiries...</p>
			) : enquiries.length === 0 ? (
				<p>No enquiries found.</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{enquiries.map((enquiry) => (
						<div
							key={enquiry._id}
							className='border rounded-md shadow-md p-4 bg-white flex flex-col'
						>
							<div className='mb-4'>
								<h2 className='text-xl text-heading font-semibold'>
									{enquiry.firstName} {enquiry.lastName}
								</h2>
								<p className='text-paragraph'>{enquiry.email}</p>
								<p className='text-paragraph'>{enquiry.phone}</p>
							</div>
							<div className='mb-4 text-paragraph'>
								<p>
									<strong>Location:</strong> {enquiry.city}, {enquiry.state},
									{enquiry.country}, {enquiry.zip}
								</p>
								<p>
									<strong>Message:</strong> {enquiry.message}
								</p>
							</div>
							{enquiry.productId && (
								<div className='mb-4'>
									<p>
										<strong>Product:</strong> {enquiry.productId.title}
									</p>
									<p>
										<strong>Price:</strong> $
										{enquiry.productId.price.toFixed(2)}
									</p>
									<p>{enquiry.productId.description}</p>
									{enquiry.productId.image && (
										<img
											src={enquiry.productId.image.url}
											alt={enquiry.productId.image.alt}
											className='w-full h-40 object-cover rounded-md mt-2'
										/>
									)}
								</div>
							)}
							<button
								className='mt-auto bg-gradient-to-r from-secondary to-action text-primary px-4 py-2 rounded hover:bg-red-700'
								onClick={() => handleDelete(enquiry._id)}
							>
								Delete
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
