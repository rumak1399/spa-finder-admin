import Image from "next/image";

const RoundedCard = () => {
	return (
		<div className='w-[160px] flex flex-col items-center gap-2'>
			<Image
				className='rounded-full border border-borderColor '
				width={120}
				height={120}
				src={"/brand.png"}
				alt='brand logo'
			/>
			<p className='w-full break-word text-center text-[14px] font-semibold'>
				Aqua Boy Moisture Meters
			</p>
		</div>
	);
};

export default RoundedCard;
