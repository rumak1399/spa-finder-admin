import Image from "next/image";

const AboutUsSection = () => {
	return (
		<section className='w-full h-[900px] sm:h-[700px] lg:h-[448px]  flex justify-center  '>
			<div className='w-full max-w-[1200px] h-fit flex flex-wrap lg:flex-nowrap gap-2 '>
				<div className='w-full h-full  lg:w-1/3'>
					<Image
						width={350}
						height={350}
						src={"/about-us.jpg"}
						alt='meeting borard'
						style={{ objectFit: "cover" }}
					/>
				</div>
				<div className='w-full lg:w-2/3 flex flex-col gap-2'>
					<header>
						<h5 className='text-[18px] text-action'>14 Years of Journey</h5>
						<h2 className='text-[27px] font-bold text-heading'>ABOUT US</h2>
					</header>
					<p className='text-[15px] text-paragraph font-semibold text-paragraph'>
						best Laboratory Equipment importers and Providers in Bangladesh
					</p>
					<article className='text-[15px] leading-7'>
						Since the establishment of Multivision Technology (Pvt.) Ltd is one
						of the best Laboratory Equipment importers and Providers in
						Bangladesh. It has a very good sales and service network in many in
						house & third-party textile & leather testing labs. Multivision
						Technology (Pvt.) Ltd is providing professional service to fulfill
						various requirements of customers and has become the most valuable &
						reliable partner. Every day a huge number of customers are getting
						sales and service support from our company. Multivision Technology
						(Pvt.) Ltd has an experienced sales and service team. Our team is
						always ready to fulfill customer needs with their hard work and
						loyalty. Adequate information about our products is analyzed by our
						team to give the best solution. We always offer our customers a
						distinct advantage over competitors.
					</article>
				</div>
			</div>
		</section>
	);
};

export default AboutUsSection;
