/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { IProduct } from "./main";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AddReview({
  setDisplay,
  singlePost,
}: // setSinglePost,
{
  setDisplay: (prop: string) => void;
  singlePost: IProduct;
  // setSinglePost: (prop: IProduct) => void;
}) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericRating = parseFloat(rating);
    if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
      alert("Rating must be a number between 0 and 5");
      return;
    }

    console.log({ rating: numericRating, comment });
    // TODO: Submit to backend
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: singlePost?._id,
            userEmail: session?.user?.email,
            rating, 
            comment
          }),
        }
      ); 
     const resData =  await response.json();
     console.log(resData);
       if(response.ok){
        alert(`Review added to ${singlePost?.title}`);
        setRating("");
        setComment("");
       }
    } catch (error) {
      console.log(error);
      alert(error)
    }
    

  };
  console.log("single post LINE AT 30", singlePost, "session", session, status);

  return (
    <div className="w-full max-w-[84%] text-secondary text-lg flex flex-col justify-center gap-5">
      <div
        onClick={() => setDisplay("products")}
        className=" h-16 mt-5  text-secondary flex  text-3xl cursor-pointer"
      >
        &lt; Back To All Products
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Add Your Review to
      </h1>
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
        <div className="w-full">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Rating (0 to 5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="e.g. 4.5"
              required
            />
          </div>

          {/* Comment Box */}
          <div className="mb-4">
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-action  text-primary rounded hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
