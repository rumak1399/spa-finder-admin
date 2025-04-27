"use client";

import { useState } from "react";

interface ProductDetailsTabsProps {
	description: string;
	specification: string;
}

const ProductDetailsTabs: React.FC<ProductDetailsTabsProps> = ({
	description,
	specification,
}) => {
	const [activeTab, setActiveTab] = useState<"description" | "specification">(
		"description"
	);

	return (
		<div className='mt-8'>
			<div className='flex gap-5 border-b '>
				<button
					className={`px-2 py-3 ${
						activeTab === "description"
							? "font-bold   bg-action text-primary"
							: ""
					}`}
					onClick={() => setActiveTab("description")}
				>
					Description
				</button>
				<button
					className={`px-2 py-3  ${
						activeTab === "specification"
							? "font-bold text-primary bg-action"
							: ""
					}`}
					onClick={() => setActiveTab("specification")}
				>
					Specification
				</button>
			</div>
			<div className='mt-3 text-[15px] text-paragraph'>
				{activeTab === "description" ? (
					<p>{description}</p>
				) : (
					<p>{specification}</p>
				)}
			</div>
		</div>
	);
};

export default ProductDetailsTabs;
