"use client";

import { useState, useEffect } from "react";

interface JobPost {
	_id: string;
	position: string;
	department: string;
	location: string;
	postDate: string;
}

const JobPosts = () => {
	const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
	const [newJobPost, setNewJobPost] = useState({
		position: "",
		department: "",
		location: "",
		postDate: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchJobPosts = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/careers`
			);
			if (!res.ok) throw new Error("Failed to fetch job posts");
			const data = await res.json();
			setJobPosts(data);
		} catch (err) {
			console.log(err);

			setError("Error fetching job posts");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/careers`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newJobPost),
				}
			);

			if (!res.ok) throw new Error("Failed to create job post");

			const createdPost = await res.json();
			setJobPosts((prev) => [...prev, createdPost]);
			setNewJobPost({
				position: "",
				department: "",
				location: "",
				postDate: "",
			});
		} catch (err) {
			console.log(err);

			setError("Error creating job post");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/careers/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!res.ok) throw new Error("Failed to delete job post");

			setJobPosts((prev) => prev.filter((job) => job._id !== id));
		} catch (err) {
			console.log(err);

			setError("Error deleting job post");
		}
	};

	useEffect(() => {
		fetchJobPosts();
	}, []);

	return (
		<main className='w-full h-fit min-h-screen flex flex-col gap-8 items-center mt-16 pb-10 px-1'>
			<h1 className='uppercase text-[27px] text-paragraph  font-bold'>
				Manage Job Posts
			</h1>

			{/* Error message */}
			{error && <p className='text-red-500'>{error}</p>}

			{/* Form for creating a new job post */}
			<form
				onSubmit={handleSubmit}
				className='w-[95%] max-w-[1200px] flex flex-col gap-4 border border-borderColor p-4 rounded-md shadow-sm'
			>
				<h2 className='uppercase text-paragraph font-semibold'>
					Create Job Post
				</h2>
				<div className='flex flex-wrap gap-4'>
					<input
						type='text'
						placeholder='Position'
						className='border border-borderColor px-4 py-2 rounded-md w-full md:w-[48%]'
						value={newJobPost.position}
						onChange={(e) =>
							setNewJobPost({ ...newJobPost, position: e.target.value })
						}
						required
					/>
					<input
						type='text'
						placeholder='Department'
						className='border border-borderColor px-4 py-2 rounded-md w-full md:w-[48%]'
						value={newJobPost.department}
						onChange={(e) =>
							setNewJobPost({ ...newJobPost, department: e.target.value })
						}
						required
					/>
					<input
						type='text'
						placeholder='Location'
						className='border border-borderColor px-4 py-2 rounded-md w-full md:w-[48%]'
						value={newJobPost.location}
						onChange={(e) =>
							setNewJobPost({ ...newJobPost, location: e.target.value })
						}
						required
					/>
					<input
						type='date'
						className='border border-borderColor px-4 py-2 rounded-md w-full md:w-[48%]'
						value={newJobPost.postDate}
						onChange={(e) =>
							setNewJobPost({ ...newJobPost, postDate: e.target.value })
						}
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full h-12 bg-gradient-to-l from-secondary to-action py-3 rounded-md text-primary font-semibold'
					disabled={loading}
				>
					{loading ? "Creating..." : "Create Job Post"}
				</button>
			</form>

			{/* Job posts table */}
			<div className='w-[95%] max-w-[1200px] flex flex-wrap gap-4 justify-center'>
				<table className='w-full border border-borderColor text-paragraph'>
					<thead>
						<tr className='w-full h-fit min-h-[67px] bg-gray-100 divide-x divide-borderColor'>
							<th className='px-4 py-3 text-center text-paragraph'>S.No.</th>
							<th className='px-4 py-3 text-center text-paragraph'>Position</th>
							<th className='px-4 py-3 text-center text-paragraph'>
								Department
							</th>
							<th className='px-4 py-3 text-center text-paragraph'>Location</th>
							<th className='px-4 py-3 text-center text-paragraph'>
								Post Date
							</th>
							<th className='px-4 py-3 text-center text-paragraph'>Action</th>
						</tr>
					</thead>
					<tbody>
						{jobPosts.map((job, index) => (
							<tr
								key={job._id}
								className='w-full h-fit min-h-[67px] odd:bg-white even:bg-[#f7f9fb] divide-x divide-borderColor'
							>
								<td className='px-4 py-3 text-center border-t border-borderColor'>
									{index + 1}
								</td>
								<td className='px-4 py-3 text-center border-t border-borderColor'>
									{job.position}
								</td>
								<td className='px-4 py-3 text-center border-t border-borderColor'>
									{job.department}
								</td>
								<td className='px-4 py-3 text-center border-t border-borderColor'>
									{job.location}
								</td>
								<td className='px-4 py-3 text-center border-t border-borderColor'>
									{new Date(job.postDate).toLocaleDateString()}
								</td>
								<td className='px-4 py-3 text-center border-t border-borderColor'>
									<button
										onClick={() => handleDelete(job._id)}
										className='w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-600'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
};

export default JobPosts;
