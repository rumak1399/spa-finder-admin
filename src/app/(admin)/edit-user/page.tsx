"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ImageUploader } from "@/components/admin/imageUploader";
import { useSession } from "next-auth/react";

const EditUser = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { data: session } = useSession();

	const token = searchParams.get("token");

	const [isVerified, setIsVerified] = useState(false);
	const [name, setName] = useState(session?.user.name || "");
	const [email, setEmail] = useState(session?.user.email || "");
	const [profilePicture, setProfilePicture] = useState(
		session?.user.image || ""
	);
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (token) {
			fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/verify-token?token=${token}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.success) setIsVerified(true);
					else alert("Invalid or expired token.");
				})
				.catch((error) => console.error(error));
		}
	}, [token]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const updateData: {
			token: string | null;
			name: string;
			email: string;
			image: string;
			password?: string;
		} = {
			token,
			name,
			email,
			image: profilePicture,
		};
		if (password) {
			updateData.password = password;
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/update-user`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updateData),
				}
			);

			if (!response.ok) throw new Error("Failed to update user details.");
			router.push("/admin");
		} catch (error) {
			console.error(error);
			alert("Failed to update user details.");
		}
	};

	if (!isVerified) return <p>Verifying token...</p>;

	return (
		<div className='bg-borderColor min-h-screen flex items-center justify-center py-10 px-4'>
			<form
				onSubmit={handleSubmit}
				className='bg-primary rounded-lg shadow-lg p-6 w-full max-w-md'
			>
				<h1 className='text-heading text-2xl font-bold mb-6'>Edit Details</h1>
				<div className='mb-4'>
					<label className='block text-paragraph font-medium mb-2'>Name</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='border border-borderColor rounded-lg px-4 py-2 w-full'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-paragraph font-medium mb-2'>Email</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='border border-borderColor rounded-lg px-4 py-2 w-full'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-paragraph font-medium mb-2'>
						Password
					</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='border border-borderColor rounded-lg px-4 py-2 w-full'
						placeholder='Enter new password (optional)'
					/>
				</div>
				<div className='mb-6'>
					<label className='block text-paragraph font-medium mb-2'>
						Profile Picture
					</label>
					<ImageUploader onUploadSuccess={(link) => setProfilePicture(link)} />

					{profilePicture && (
						<img
							src={profilePicture}
							alt='Uploaded Preview'
							className='mt-4 w-24 h-24 rounded-full object-cover'
						/>
					)}
				</div>
				<button
					type='submit'
					className='bg-action text-primary py-2 px-4 rounded-lg w-full hover:opacity-90 transition'
				>
					Update Details
				</button>
			</form>
		</div>
	);
};

export default EditUser;
