"use client";

import Allproducts from "@/components/admin/allProducts";
import Nav from "@/components/admin/nav";
import SidebarAdnin from "@/components/admin/sidebar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AllCategories, ICategory } from "./allCategories";

import HomeSliderAdmin from "./allHomeSlider";
import BrandsAdmin from "./all-brands";
import AllEnquiries from "./allEnquiry";
import AllContactMessages from "./allContact";
import AllJobApplicationsPage from "./allJobApplications";
import JobPosts from "./addJobPost";
import Subscribers from "./allSubscriber";
import ManageOrders from "./allOrders";
import Settings from "./adminsettings";
import ThemePage from "./theme";

export interface IProduct {
	_id?: string; // Unique identifier for the product
	title: string; // Product name/title
	slug: string; // URL-friendly unique identifier
	specification: string;
	description: string; // Brief description of the product
	image: {
		url: string; // URL of the product image
		alt: string; // Alternative text for the image
	};
	brochure?: {
		url: string; // URL for the brochure file
		filename: string; // Brochure file name
	};
	price: number; // Product price
	discount?: boolean; // Indicates if the product is discounted
	discountAmount: number; // Discount percentage (e.g., 10 for 10%)
	category: ICategory; // Category ID (referencing the Category model)
	featured: boolean; // Indicates if the product is featured
	newlyArrived: boolean; // Indicates if the product is newly arrived
	status: string; // Product status (e.g., Published/Unpublished)
	createdAt?: Date; // Timestamp of creation
	updatedAt?: Date; // Timestamp of last update
}

const MainComponentAdmin = ({ logo }: { logo: string }) => {
	const [tab, setTab] = useState<string>("Products");
	const [display, setDisplay] = useState<string>("products");
	const [products, setProducts] = useState<{
		published: IProduct[];
		unpublished: IProduct[];
		allProducts: IProduct[];
	}>({ published: [], unpublished: [], allProducts: [] }); // State to hold products
	const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
	const [error, setError] = useState<string | null>(null); // State for error handling

	const { data: session, status } = useSession(); // Fetch session data
	const router = useRouter();

	// // Redirect if not authenticated or not an admin
	// useEffect(() => {
	// 	if (session && session.user?.role === "admin") {
	// 		router.push("/admin");
	// 	} else if (session && session.user?.role !== "admin") {
	// 		router.push("/unauthorized"); // Redirect unauthorized users
	// 	} else {
	// 		router.push("/admin/login");
	// 	}
	// }, [session, router]);

	// Fetch products from the API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/products/groupedbystatus`,
					{ method: "GET" }
				);

				const data: {
					message: string;
					groupedProducts: {
						published: IProduct[];
						unpublished: IProduct[];
						allProducts: IProduct[];
					};
				} = await response.json();
// if(data.groupedProducts.allProducts.length )
				setProducts(data.groupedProducts);
			
			} catch (err: unknown) {
				
				setError(String(err) || "Failed to fetch products.");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Loading or unauthenticated state
	if (status === "loading") {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				Loading...
			</div>
		);
	}

	return (
		<>
			<SidebarAdnin logo={logo} setTab={setTab} />
			<div className='scrolar w-full max-h-screen overflow-y-auto pb-10'>
				<Nav />
				<div className='w-full flex justify-between items-center pl-10 pr-14'>
					<div className=' h-16 mt-5  text-secondary flex justify-center items-center text-3xl'>
						{display !== "addProduct" ? (
							<></>
						) : (
							<div
								onClick={() => setDisplay("products")}
								className='cursor-pointer '
							>
								&lt; Back To All Products
							</div>
						)}
					</div>

					{tab === "Products" && display === "products" && (
						<div
							onClick={() => setDisplay("addProduct")}
							className='px-4 py-2 h-10 flex justify-center items-center text-primary rounded-md bg-action shadow-md cursor-pointer'
						>
							Add New Product
						</div>
					)}
				</div>

				{tab === "Products" && (
					<>
						{/* Show loading indicator */}
						{loading && (
							<div className='w-full h-[50%] flex justify-center items-center'>
								Loading products...
							</div>
						)}

						{/* Show error message */}
						{/* {error && (
							<div className='w-full h-[50%] flex justify-center items-center text-red-500'>
								Error: {error}
							</div>
						)} */}

						{/* Show products */}
						{!loading  && (
							<Allproducts
								setDisplay={setDisplay}
								display={display}
								groupedProducts={products}
							/>
						)}
					</>
				)}
				{tab === "Orders" && <ManageOrders />}
				{tab === "Categories" && <AllCategories />}
				{tab === "Slider Image" && <HomeSliderAdmin />}

				{tab === "Customars" && <BrandsAdmin />}
				{tab === "Enquries" && <AllEnquiries />}
				{tab === "Messages" && <AllContactMessages />}
				{tab === "Careers" && <JobPosts />}
				{tab === "Applications" && <AllJobApplicationsPage />}
				{tab === "Subscribers" && <Subscribers />}
				{tab === "Theme" && <ThemePage />}
				{tab === "Settings" && session && (
					<Settings
						user={{
							name: session.user.name || "",
							email: session.user.email || "",
							image: session.user.image || "",
						}}
					/>
				)}
			</div>
		</>
	);
};

export default MainComponentAdmin;
