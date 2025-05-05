"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginAdmin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// Use NextAuth's `signIn` for authentication
		const result = await signIn("credentials", {
			redirect: false, // Prevent automatic redirects for custom handling
			email,
			password,
		});

		if (result?.error) {
			setError(result.error);
		} else {
			// Redirect to admin dashboard or handle success
			router.push("/admin");
		}
	};

	return (
		<main className='w-full h-fit min-h-[60vh] flex flex-col gap-8 items-center mt-16 pb-10 px-1'>
			<div className='w-[95%] max-w-[1200px] flex flex-wrap-reverse gap-8 justify-center'>
				<form
					onSubmit={handleSubmit}
					className='w-full max-w-[350px] h-fit p-6 border border-borderColor shadow-lg rounded-md'
				>
					<h3 className='uppercase text-center text-[27px] font-[500] mb-3'>
						Admin Login
					</h3>

					<div className='flex flex-col gap-[15px]'>
						<div className='flex flex-col gap-4 w-full justify-between'>
							<input
								type='email'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Email'
								required
							/>

							<input
								type='password'
								className='w-full py-[10px] px-[15px] border border-borderColor rounded-md'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Password'
								required
							/>
						</div>

						{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

						<div className='mt-4'>
							<button
								type='submit'
								className='w-full h-12 rounded-md text-primary bg-gradient-to-l from-secondary to-action flex justify-center items-center uppercase hover:shadow-md hover:scale-105'
							>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}
