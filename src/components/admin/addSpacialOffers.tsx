"use client";

import React, { useState } from "react";
import { ImageUploader } from "./imageUploader";

export default function AddSpacialOffer() {
	const [file, setFile] = useState<string | undefined>();

	return (
		<>
			<form className='w-full max-w-[84%] p-5 border border-bcollor text-secondary text-lg flex justify-center'>
				<div className='w-full '>
					<div className='w-full flex gap-4 '>
						<label htmlFor='link'>Product Link</label>
						<input
							className='w-[70%] h-10 px-2 rounded-md border border-secondary'
							type='text'
							name='link'
							id='link'
							required
							placeholder='Enter page link of the product'
						/>
					</div>
					<div className=' flex flex-col gap-2 mt-5'>
						<label htmlFor='file'>Image for home slider</label>

						<ImageUploader onUploadSuccess={setFile} />
						<img className='w-full h-fit' src={file} />
					</div>

					<div className='w-full mt-2 flex justify-end'>
						<button
							className='px-6 rounded-md text-primary text-2xl bg-action'
							type='submit'
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
// this is product description. it is a very long description. writing a product description is very hard.
// so i wrote whatever came to my mind . if you are still reading this if are a lonly gay with no work to do.
// go and get a job then get married. and if you are below 18 . then go study.
