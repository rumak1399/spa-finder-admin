"use client";

import React, { useEffect, useState } from "react";

interface JobPost {
	_id: string;
	position: string;
	department: string;
	location: string;
	postDate: string;
}

interface JobApplication {
	_id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	country: string;
	city: string;
	state: string;
	zip: string;
	message: string;
	submittedAt: string;
	jobId: JobPost; // Add job details here
}

export default function AllJobApplicationsPage() {
	const [applications, setApplications] = useState<JobApplication[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchApplications = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/job-applications`,
				{ method: "GET" }
			);
			if (response.ok) {
				const data = await response.json();
				setApplications(data.data);
			} else {
				alert("Failed to fetch job applications.");
			}
		} catch (error) {
			console.error("Error fetching job applications:", error);
			alert("An error occurred while fetching job applications.");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this application?")) return;

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/job-application/${id}`,
				{
					method: "DELETE",
				}
			);
			if (response.ok) {
				setApplications(applications.filter((app) => app._id !== id));
			} else {
				const result = await response.json();
				alert(result.message || "Failed to delete application.");
			}
		} catch (error) {
			console.error("Error deleting application:", error);
			alert("An error occurred while deleting the application.");
		}
	};

	useEffect(() => {
		fetchApplications();
	}, []);

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-4'>Job Applications</h1>
			{loading ? (
				<p>Loading applications...</p>
			) : applications && applications.length === 0 ? (
				<p>No job applications found.</p>
			) : (
				<div className='flex flex-col gap-6'>
					{applications.map((app) => (
						<div
							key={app._id}
							className='w-full border border-borderColor rounded-md shadow-md p-6 bg-primary'
						>
							<div className='mb-4'>
								<h2 className='text-xl text-heading font-semibold'>
									{app.firstName} {app.lastName}
								</h2>
								<p className='text-paragraph'>{app.email}</p>
								<p className='text-paragraph'>{app.phone}</p>
							</div>
							<div className='mb-4 text-paragraph'>
								<p>
									<strong>Location:</strong> {app.city}, {app.state},{" "}
									{app.country} - {app.zip}
								</p>
								<p>
									<strong>Submitted At:</strong>{" "}
									{new Date(app.submittedAt).toLocaleString()}
								</p>
							</div>
							{app.jobId && (
								<div className='mb-4 text-paragraph'>
									<h3 className='text-lg font-semibold'>Job Details:</h3>
									<p>
										<strong>Position:</strong> {app.jobId.position}
									</p>
									<p>
										<strong>Department:</strong> {app.jobId.department}
									</p>
									<p>
										<strong>Location:</strong> {app.jobId.location}
									</p>
									<p>
										<strong>Post Date:</strong>{" "}
										{new Date(app.jobId.postDate).toLocaleDateString()}
									</p>
								</div>
							)}
							<div className='mb-4 text-paragraph'>
								<p>
									<strong>About him/her:</strong> {app.message}
								</p>
							</div>
							<button
								className='w-full bg-gradient-to-r from-secondary to-action text-primary text-center px-4 py-2 rounded hover:bg-red-700'
								onClick={() => handleDelete(app._id)}
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
