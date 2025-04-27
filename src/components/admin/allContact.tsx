"use client";

import React, { useEffect, useState } from "react";

interface Contact {
	_id: string;
	name: string;
	phone: string;
	email: string;
	subject: string;
	message: string;
}

export default function AllContactMessages() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchContacts = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/contacts`,
				{ method: "GET" }
			);
			if (response.ok) {
				const data = await response.json();
				setContacts(data.contacts);
			} else {
				alert("Failed to fetch contacts.");
			}
		} catch (error) {
			console.error("Error fetching contacts:", error);
			alert("An error occurred while fetching contacts.");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this contact?")) return;

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/contact/${id}`,
				{ method: "DELETE" }
			);
			if (response.ok) {
				alert("Contact deleted successfully.");
				setContacts(contacts.filter((contact) => contact._id !== id));
			} else {
				const result = await response.json();
				alert(result.message || "Failed to delete contact.");
			}
		} catch (error) {
			console.error("Error deleting contact:", error);
			alert("An error occurred while deleting the contact.");
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-4'>All Contacts</h1>
			{loading ? (
				<p>Loading contacts...</p>
			) : contacts.length === 0 ? (
				<p>No contacts found.</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{contacts.map((contact) => (
						<div
							key={contact._id}
							className='border border-borderColor rounded-md shadow-md p-4 bg-primary flex flex-col'
						>
							<div className='mb-4'>
								<h2 className='text-xl text-heading font-semibold'>
									{contact.name}
								</h2>
								<p className='text-paragraph'>{contact.email}</p>
								<p className='text-paragraph'>{contact.phone}</p>
							</div>
							<div className='mb-4 text-paragraph'>
								<p>
									<strong>Subject:</strong> {contact.subject}
								</p>
								<p>
									<strong>Message:</strong> {contact.message}
								</p>
							</div>
							<button
								className='mt-auto bg-gradient-to-r from-secondary to-action text-primary px-4 py-2 rounded hover:bg-red-700'
								onClick={() => handleDelete(contact._id)}
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
