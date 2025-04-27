"use client";

import Image from "next/image";

const CustomarCard = () => {
	return (
		<div className='w-full h-[214px] overflow-hidden '>
			<Image
				width={214}
				height={214}
				style={{ objectFit: "cover" }}
				className=''
				src={"/productImage.jpg"}
				alt={"product Image"}
			/>
		</div>
	);
};

export default CustomarCard;
