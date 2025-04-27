"use client";

import { useEffect, useState } from "react";

interface Subscriber {
	_id: string;
	email: string;
	createdAt: string;
}

const Subscribers: React.FC = () => {
	const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	// Fetch subscribers from the backend
	useEffect(() => {
		const fetchSubscribers = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/subscribers`
				);

				if (response.ok) {
					const data = await response.json();
					setSubscribers(data.data || []);
				} else {
					setError("Failed to fetch subscribers.");
				}
			} catch (err) {
				console.error(err);
				setError("An error occurred while fetching subscribers.");
			} finally {
				setLoading(false);
			}
		};

		fetchSubscribers();
	}, []);

	return (
		<main className='w-full min-h-screen flex flex-col items-center py-10 px-5 '>
			<div className='w-full max-w-[1200px] flex flex-col gap-8'>
				<h1 className='text-3xl font-bold text-center text-heading mb-4'>
					Subscribers List
				</h1>

				{loading ? (
					<p className='text-center text-lg text-paragraph'>Loading...</p>
				) : error ? (
					<p className='text-center text-lg text-paragraph'>{error}</p>
				) : subscribers.length === 0 ? (
					<p className='text-center text-lg text-paragraph'>
						No subscribers found.
					</p>
				) : (
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse border border-borderColor bg-primary shadow-md'>
							<thead className='bg-gray-100 text-paragraph'>
								<tr>
									<th className='border border-borderColor px-4 py-2 text-left'>
										Email
									</th>
									<th className='border border-borderColor px-4 py-2 text-left'>
										Subscribed On
									</th>
								</tr>
							</thead>
							<tbody>
								{subscribers.map((subscriber) => (
									<tr
										key={subscriber._id}
										className='hover:bg-gray-50 text-paragraph'
									>
										<td className='border border-borderColor px-4 py-2'>
											{subscriber.email}
										</td>
										<td className='border border-borderColor px-4 py-2'>
											{new Date(subscriber.createdAt).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</main>
	);
};

export default Subscribers;
