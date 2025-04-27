import { useState } from "react";
import Link from "next/link";

export interface ICategory {
	_id: string;
	name: string;
	slug: string;
	parent: string | null;
	children: ICategory[];
	createdAt?: Date;
	updatedAt?: Date;
}

const MobileCategoriesDropdown = ({
	allcategories,
}: {
	allcategories: ICategory[];
}) => {
	const [expandedCategories, setExpandedCategories] = useState<{
		[key: string]: boolean;
	}>({});

	// Toggle category expansion
	const toggleCategory = (id: string) => {
		setExpandedCategories((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// Render categories with indentation for hierarchy
	const renderCategories = (categories: ICategory[], depth = 0) => {
		return (
			<div>
				{categories.map((category) => (
					<div key={category._id} className={`pl-${depth * 4} py-2`}>
						<div
							className='flex justify-between items-center cursor-pointer font-bold text-[12px] hover:text-paragraph'
							onClick={() => toggleCategory(category._id)}
						>
							<Link href={`/category/${category.slug}`} className=''>
								{category.name}
							</Link>
							{category.children.length > 0 && (
								<span className='ml-2'>
									{expandedCategories[category._id] ? "-" : "+"}
								</span>
							)}
						</div>

						{/* Render children if expanded */}
						{expandedCategories[category._id] &&
							category.children.length > 0 && (
								<div>{renderCategories(category.children, depth + 1)}</div>
							)}
					</div>
				))}
			</div>
		);
	};

	return <div>{renderCategories(allcategories)}</div>;
};

export default MobileCategoriesDropdown;
