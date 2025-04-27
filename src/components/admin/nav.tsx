const Nav = () => {
	return (
		<div className='w-full h-16   px-2 shadow-md flex justify-center '>
			<div className='w-[50%] h-full flex items-center justify-end'>
				<input
					id='search'
					className='w-full h-[60%] border border-secondary rounded-full text-xl px-4'
					type='text'
				/>
			</div>
		</div>
	);
};

export default Nav;
