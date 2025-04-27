import Link from "next/link";
import ElectroluxSparepartDropdown from "./electroluxSparepartdropdown";
import Image from "next/image";

const ElectroluxDropdown = () => {
	return (
		<div className=''>
			<div className='group/eclec relative py-2 px-4 text-[12px] font-bold hover:text-paragraph flex justify-between '>
				<Link className='w-full flex justify-between' href={"/"}>
					<span>Electrolux</span>
					<Image
						src={"/next-arrow.svg"}
						width={15}
						height={15}
						alt='dropdown'
					/>
				</Link>

				<div className='absolute right-[-240px]  top-[-500px]  group-hover/eclec:top-0  min-w-[240px] w-fit h-fit bg-gradient-to-r from-secondary to-action text-primary rounded-md z-[9999999]'>
					<ElectroluxSparepartDropdown />
				</div>
			</div>

			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Wascator fom 71
				</div>
			</Link>

			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Washer Extractor WH6-6
				</div>
			</Link>
			<Link href={"/"}>
				<div className='py-2 px-4 text-[12px] font-bold hover:text-paragraph border-t border-primary '>
					Dryer TD 6-7
				</div>
			</Link>
		</div>
	);
};

export default ElectroluxDropdown;
