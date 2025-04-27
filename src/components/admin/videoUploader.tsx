"use client";

import { CldUploadWidget } from "next-cloudinary";

interface VideoUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function VideoUploader({ onUploadSuccess }: VideoUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      signatureEndpoint='/api/signcloudinary-params'
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          onUploadSuccess(result.info.secure_url);
        }
      }}
      options={{
        resourceType: "video", // 👈 important: tell Cloudinary it's a video
        singleUploadAutoClose: false,
      }}
    >
      {({ open }) => {
        return (
          <button
            type='button'
            onClick={() => open()}
            className='rounded-md bg-primary border border-borderColor px-2.5 py-1.5 text-sm font-semibold text-heading shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Upload Video
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
