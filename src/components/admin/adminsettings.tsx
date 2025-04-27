"use client";

import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserDetails = ({
	user,
}: {
	user: { name: string; email: string; image?: string };
}) => {
	const [isSending, setIsSending] = useState(false);
	const router = useRouter();
	const handleEditClick = async () => {
		setIsSending(true);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/send-verification-email`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: user.email }), // Pass user email to the backend
				}
			);

			if (!response.ok) {
				throw new Error("Failed to send verification email");
			}

			alert("Verification email sent! Check your inbox.");
		} catch (error) {
			console.error(error);
			alert("Failed to send verification email.");
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className='bg-borderColor min-h-screen flex flex-col items-center justify-center py-10 px-4'>
			<h1 className='text-heading text-3xl font-bold mb-6'>User Details</h1>
			<div className='bg-primary p-6 rounded-lg shadow-md w-full max-w-md text-center'>
				{user.image ? (
					<img
						src={user.image}
						alt='Profile'
						className='w-24 h-24 mx-auto rounded-full object-cover mb-4'
					/>
				) : (
					<FontAwesomeIcon icon={faUser} />
				)}
				<p className='text-paragraph font-medium mb-2'>Name: {user.name}</p>
				<p className='text-paragraph font-medium mb-4'>Email: {user.email}</p>
				<button
					className='bg-action text-primary py-2 px-4 rounded-lg w-full flex items-center justify-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed'
					onClick={handleEditClick}
					disabled={isSending}
				>
					{isSending ? "Sending..." : "Edit Details"}
					<FontAwesomeIcon icon={faEdit} className='ml-2' />
				</button>
			</div>
			<button
				onClick={async () => {
					await signOut();
					router.push("/admin/login");
				}}
				className='mt-6 bg-secondary text-primary font-medium py-2 px-4 rounded-lg hover:opacity-90 transition'
			>
				Logout
			</button>
		</div>
	);
};

export default UserDetails;
