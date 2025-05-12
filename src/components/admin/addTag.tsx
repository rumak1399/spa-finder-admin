/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { IProduct } from "./main";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TagInput from "./TagInput";

export default function AddTag({
  setDisplay,
  singlePost,
}: // setSinglePost,
{
  setDisplay: (prop: string) => void;
  singlePost: IProduct;
  // setSinglePost: (prop: IProduct) => void;
}) {
  const { data: session, status } = useSession();
  const [tags, setTags] = useState<string[]>([""]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Submitting tags:", tags);
  //   // Send to backend
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Submit to backend
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/tag`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: singlePost?._id,
            tags,
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      if (response.ok) {
        alert(`Review added to ${singlePost?.title}`);
        setTags(['']);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  console.log("single post LINE AT 30", singlePost, "session", session, status);

  return (
    <div className="w-full max-w-[84%] text-secondary text-lg flex flex-col justify-center gap-5">
      <div
        onClick={() => setDisplay("products")}
        className="h-16 mt-5  text-secondary flex  text-3xl cursor-pointer"
      >
        &lt; Back To All Products
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-center">Add Tags to</h1>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-heading">
            Post Name:{" "}
            <span className="text-secondary">{singlePost?.title}</span>{" "}
          </p>
          <p className="text-heading">
            Post Description:{" "}
            <span className="text-secondary">{singlePost.description}</span>
          </p>
        </div>
        <Image
          src={singlePost?.image?.url}
          alt={singlePost?.image?.alt}
          width={100}
          height={100}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {/* other inputs */}
        <TagInput onTagsChange={setTags} />
        <button
          type="submit"
          className="px-4 py-2 w-full bg-secondary text-primary rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
