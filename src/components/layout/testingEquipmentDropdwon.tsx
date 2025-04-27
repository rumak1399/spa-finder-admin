import Link from "next/link";

const TestingEquipmentDropdown = () => {
	return (
		<div className=''>
			<Link href={"/"}>
				<div className='group/eclec relative py-2 px-4 text-[12px] font-bold hover:text-paragraph flex justify-between '>
					Leather & Footwear
				</div>
			</Link>
			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Paper & Packaging
				</div>
			</Link>

			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Toys
				</div>
			</Link>
			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Automotive
				</div>
			</Link>
			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Colour Matching & Analysis
				</div>
			</Link>
		</div>
	);
};

export default TestingEquipmentDropdown;
