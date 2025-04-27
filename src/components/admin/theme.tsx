"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Image from "next/image";
import { ImageUploader } from "./imageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface Theme {
	primary: string;
	secondary: string;
	heading: string;
	paragraph: string;
	action: string;
	borderColor: string;
	[key: string]: string | null;
	logo: string; // Index signature for dynamic keys
}

const ThemePage: React.FC = () => {
	const [logo, setLogo] = useState<string>("");
	const [theme, setTheme] = useState<Theme>({
		primary: "",
		secondary: "",
		heading: "",
		paragraph: "",
		action: "",
		borderColor: "",
		logo: logo,
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Preset themes
	const presets: Theme[] = [
		{
			primary: "#ffffff",
			secondary: "#ff1f7e",
			heading: "#000000",
			paragraph: "#333333",
			action: "#fb953b",
			borderColor: "#cccccc",
			logo: logo,
		},
		{
			primary: "#f0f0f0",
			secondary: "#007bff",
			heading: "#111111",
			paragraph: "#555555",
			action: "#28a745",
			borderColor: "#dddddd",
			logo: logo,
		},
		{
			primary: "#202020",
			secondary: "#ff5722",
			heading: "#ffffff",
			paragraph: "#cccccc",
			action: "#ff9800",
			borderColor: "#666666",
			logo: logo,
		},
		{
			primary: "#f3f4f6",
			secondary: "#4b4f58",
			heading: "#1f1f1f",
			paragraph: "#757575",
			action: "#8c7ae6",
			borderColor: "#ddd",

			logo: logo,
		},
		{
			primary: "#ffffff",
			secondary: "#1abc9c",
			heading: "#2c3e50",
			paragraph: "#7f8c8d",
			action: "#e74c3c",
			borderColor: "#ecf0f1",
			logo: logo,
		},
		{
			primary: "#ffffff",
			secondary: "#2ecc71",
			heading: "#34495e",
			paragraph: "#95a5a6",
			action: "#e67e22",
			borderColor: "#bdc3c7",
			logo: logo,
		},
		{
			primary: "#ecf0f1",
			secondary: "#3498db",
			heading: "#2c3e50",
			paragraph: "#7f8c8d",
			action: "#f39c12",
			borderColor: "#bdc3c7",
			logo: logo,
		},
		{
			primary: "#fafafa",
			secondary: "#9b59b6",
			heading: "#2c3e50",
			paragraph: "#34495e",
			action: "#16a085",
			borderColor: "#ecf0f1",
			logo: logo,
		},
		{
			primary: "#ffffff",
			secondary: "#8e44ad",
			heading: "#2c3e50",
			paragraph: "#7f8c8d",
			action: "#f39c12",
			borderColor: "#e74c3c",
			logo: logo,
		},
		{
			primary: "#f4f6f7",
			secondary: "#e74c3c",
			heading: "#2c3e50",
			paragraph: "#34495e",
			action: "#3498db",
			borderColor: "#95a5a6",
			logo: logo,
		},
		{
			primary: "#ffffff",
			secondary: "#2980b9",
			heading: "#2c3e50",
			paragraph: "#95a5a6",
			action: "#f39c12",
			borderColor: "#34495e",
			logo: logo,
		},
		{
			primary: "#f0f0f0",
			secondary: "#16a085",
			heading: "#ffffff",
			paragraph: "#7f8c8d",
			action: "#8e44ad",
			borderColor: "#95a5a6",
			logo: logo,
		},
		{
			primary: "#ffffff",
			secondary: "#f39c12",
			heading: "#2c3e50",
			paragraph: "#7f8c8d",
			action: "#e74c3c",
			borderColor: "#bdc3c7",
			logo: logo,
		},
		{
			primary: "#ececec",
			secondary: "#d35400",
			heading: "#2c3e50",
			paragraph: "#7f8c8d",
			action: "#8e44ad",
			borderColor: "#34495e",
			logo: logo,
		},
	];

	// Fetch theme data from API
	const fetchTheme = async () => {
		try {
			setLoading(true);
			const response = await axios.get<Theme>(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/theme`
			); // Replace with your API route
			setTheme(response.data);
			setLogo(response.data.logo);
			// Set CSS variables dynamically
			Object.entries(response.data).forEach(([key, value]) => {
				if (typeof value === "string") {
					document.documentElement.style.setProperty(
						`--theme-${key}`,
						value as string
					);
				}
			});
		} catch (err) {
			console.error("Error fetching theme:", err);
			setError("Failed to load theme data.");
		} finally {
			setLoading(false);
		}
	};

	// Update theme on the backend
	const updateTheme = async () => {
		try {
			await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/theme`, {
				...theme,
				logo,
			}); // Replace with your API route
			alert("Theme updated successfully!");
		} catch (err) {
			console.error("Error updating theme:", err);
			alert("Failed to update theme. Please try again.");
		}
	};

	// Apply a preset theme
	const applyPreset = (preset: Theme) => {
		setTheme(preset);

		// Update CSS variables live
		Object.entries(preset).forEach(([key, value]) => {
			if (typeof value === "string") {
				document.documentElement.style.setProperty(
					`--theme-${key}`,
					value as string
				);
			}
		});
	};

	// Handle input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTheme((prev) => ({ ...prev, [name]: value }));

		// Update CSS variables live
		document.documentElement.style.setProperty(`--theme-${name}`, value);
	};

	useEffect(() => {
		fetchTheme();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p className='text-red-600'>{error}</p>;
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1
				className='text-2xl font-bold mb-4'
				style={{ color: "var(--theme-heading)" }}
			>
				Edit Theme
			</h1>
			<div className='mb-6'>
				<div className='flex flex-col gap-2'>
					<h3>Site Logo</h3>
					{logo && logo.length > 0 ? (
						<Image width={260} height={53} src={logo} alt={logo} />
					) : (
						<div className='w-[260px] h-[52px] flex justify-center items-center border border-borderColor'>
							<FontAwesomeIcon icon={faImage} />
						</div>
					)}
					<ImageUploader
						onUploadSuccess={(link) => {
							setLogo(link);
						}}
					/>
				</div>
			</div>
			{/* Preset Themes Section */}
			<div className='mb-6'>
				<h2
					className='text-xl font-bold mb-2'
					style={{ color: "var(--theme-heading)" }}
				>
					Theme Color Presets
				</h2>
				<div className='flex gap-4 flex-wrap '>
					{presets.map((preset, index) => (
						<button
							key={index}
							className='flex flex-col items-center py-2 px-4 rounded-md border border-borderColor '
							style={{
								// Use the secondary color as background
								color: preset.primary, // Text color set to primary color

								width: "100px", // Optional: Set width to ensure consistency
							}}
							onClick={() => applyPreset(preset)}
						>
							<div
								className='w-full h-8 '
								style={{
									backgroundColor: preset.primary, // Show primary color as the top swatch
								}}
							></div>
							<div
								className='w-full h-8  '
								style={{
									backgroundColor: preset.secondary, // Show secondary color as the second swatch
								}}
							></div>
							<div
								className='w-full h-8'
								style={{
									backgroundColor: preset.action, // Show action color as the third swatch
								}}
							></div>
							<div
								className='w-full h-8'
								style={{
									backgroundColor: preset.heading, // Show action color as the third swatch
								}}
							></div>
							<div
								className='w-full h-8'
								style={{
									backgroundColor: preset.paragraph, // Show action color as the third swatch
								}}
							></div>
							<div
								className='w-full h-8'
								style={{
									backgroundColor: preset.borderColor, // Show action color as the third swatch
								}}
							></div>
							<span className='text-sm mt-2'>Preset {index + 1}</span>
						</button>
					))}
				</div>
			</div>
			<div className='flex gap-5'>
				{/* Theme Form */}
				<form
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
						e.preventDefault();
						updateTheme();
					}}
					className='space-y-6'
				>
					{Object.keys(theme)
						.filter(
							(key) =>
								!["_id", "createdAt", "updatedAt", "__v", "logo"].includes(key)
						)
						.map((key) => (
							<div key={key} className='flex flex-col gap-2'>
								<label
									htmlFor={key}
									className='font-medium capitalize'
									style={{ color: "var(--theme-paragraph)" }}
								>
									{key}
								</label>
								<div className='flex gap-4 items-center'>
									<input
										type='color'
										id={key}
										name={key}
										value={theme[key] as string}
										onChange={handleChange}
										className='w-16 h-10 border rounded-md'
									/>
									<input
										type='text'
										name={key}
										value={theme[key] as string}
										onChange={handleChange}
										className='flex-grow p-2 border rounded-md'
										style={{
											borderColor: "var(--theme-borderColor)",
											color: "var(--theme-paragraph)",
										}}
										placeholder={`Enter ${key} color`}
									/>
								</div>
							</div>
						))}
					<button
						type='submit'
						className='w-full py-2 px-4 rounded-md'
						style={{
							backgroundColor: "var(--theme-action)",
							color: "var(--theme-primary)",
						}}
					>
						Save Changes
					</button>
				</form>
				<div className=''>
					<h2
						className='text-xl font-bold mb-4'
						style={{ color: "var(--theme-heading)" }}
					>
						Preview
					</h2>

					{/* Secondary Background with Primary Text */}
					<section
						className='p-6 rounded-md mb-6'
						style={{
							backgroundColor: "var(--theme-secondary)",
							color: "var(--theme-primary)",
						}}
					>
						<h1 style={{ color: "var(--theme-heading)" }}>Heading 1</h1>
						<h2 style={{ color: "var(--theme-heading)" }}>Heading 2</h2>
						<h3 style={{ color: "var(--theme-heading)" }}>Heading 3</h3>
						<h4 style={{ color: "var(--theme-heading)" }}>Heading 4</h4>
						<h5 style={{ color: "var(--theme-heading)" }}>Heading 5</h5>
						<h6 style={{ color: "var(--theme-heading)" }}>Heading 6</h6>
						<p style={{ color: "var(--theme-paragraph)" }}>
							This is a paragraph showcasing the paragraph color.
						</p>
						<button
							style={{
								backgroundColor: "var(--theme-action)",
								color: "var(--theme-primary)",
								border: `2px solid var(--theme-borderColor)`,
							}}
							className='py-2 px-4 rounded-md mt-4'
						>
							Action Button
						</button>
					</section>

					{/* Primary Background with Border */}
					<section
						className='p-6 rounded-md'
						style={{
							backgroundColor: "var(--theme-primary)",
							border: `1px solid var(--theme-borderColor)`,
						}}
					>
						<h3 style={{ color: "var(--theme-heading)" }}>
							Section Background
						</h3>
						<p style={{ color: "var(--theme-paragraph)" }}>
							This section shows the primary background color with a border
							color applied.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ThemePage;
