import Link from "next/link";

const ElectroluxSparepartDropdown = () => {
	return (
		<div className=''>
			<Link href={"/"}>
				<div className='relative py-2 px-4 text-[12px] font-bold hover:text-paragraph '>
					Electrolux Wascator FOM71
				</div>
			</Link>
			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Washer WH6-6 , W555H & W455H
				</div>
			</Link>

			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Dryer T5130 & TD6-7
				</div>
			</Link>
		</div>
	);
};

export default ElectroluxSparepartDropdown;
