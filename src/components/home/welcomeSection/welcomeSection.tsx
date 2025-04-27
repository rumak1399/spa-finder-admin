import Image from "next/image";

const WelcomeSection = () => {
	return (
		<section className='w-full h-[950px] sm:h-[700px] lg:h-[450px]  flex justify-center mt-7 sm:mt-0  '>
			<div className='w-full max-w-[1200px] h-fit flex flex-wrap-reverse'>
				<article className='w-full lg:w-2/3 flex flex-col justify-start gap-2'>
					<header>
						<h1 className='text-[27px] font-bold text-heading'>
							Welcome To Multivision Technology (Pvt.) Ltd.
						</h1>
					</header>
					<p className='text-[15px] text-paragraph leading-7'>
						We have 14 years of journey in providing innovative technologies and
						solutions for Textile/Hosiery Machinery,
						Electrical/Mechanical/Electronics & Instrumentation Automation, and
						Industrial Automation and Control. As an independent, privately
						owned company, we offer machinery products for all industries,
						including chemical and oil and gas, packaging, steel, windmill, and
						more.
					</p>
					<p className='text-[15px] text-paragraph leading-7'>
						Our products include API Pneumatic Cylinder AMA 32/150 Cylinder, API
						Pneumatic Cylinder 40/150 AMA Cylinder, Novotecnic Rotary
						Potentiometer SP2801 100 002 001, Pizzato Limit Switch NFB110FB DMK,
						Pizzato Limit Switch E6 IDM010K-D319, Limit-Switch-fl-525, GSM
						Cutting PAD, and Allen Bradley - POWERFLEX AC Drive 4M-5.5 KW
						(7.5HP)AD DRIVE 22F D013N104 and much more. We also offer textile
						machinery, laboratory equipment, machinery spares, and accessories
						to textile and non-textile industries.
					</p>
					<button className='py-3 px-6 w-fit bg-gradient-to-r from-secondary to-action text-primary rounded-md'>
						Know More
					</button>
				</article>
				<div className='w-full  lg:w-1/3'>
					<Image
						width={350}
						height={350}
						src={"/about-us.jpg"}
						alt='meeting borard'
						style={{ objectFit: "cover" }}
					/>
				</div>
			</div>
		</section>
	);
};

export default WelcomeSection;
