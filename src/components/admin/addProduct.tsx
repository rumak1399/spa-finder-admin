/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { ImageUploader } from "./imageUploader";
import { ICategory } from "./allCategories";
// import { PdfUploader } from "./pdfUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { VideoUploader } from "./videoUploader";

export default function AddProduct({
  setDisplay,
}: {
  setDisplay: (prop: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(0);
  const [discount, setDiscount] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number | undefined>(0);
  const [status, setStatus] = useState<boolean>(false);
  const [featured, setFeatured] = useState<boolean>(false);
  const [newlyarrived, setnewlyArrived] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [specification, setSpecification] = useState<string>("");
  const [category, setCategory] = useState<{ id: string}>({
    id: "",
  });
  const [categories, setCategories] = useState<ICategory[]>([]); // Hierarchical categories
  const [mainImage, setMainImage] = useState<string | undefined>();
  const [video, setVideo] = useState<string | undefined>();
  //   const [pdf, setPdf] = useState<string | undefined>();
  //   const [pdfNmae, setPdfname] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [slugPreview, setSlugPreview] = useState<string>("");
  const uid = uuidv4();
  // Fetch hierarchical categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories/all`
      );
      const data = await response.json();
      if (response.ok) {
        setCategories(data?.data);
      } else {
        setError(data.message || "Failed to fetch categories.");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("An error occurred while fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Generate slug preview
  // useEffect(() => {
  //   if (category.path && name) {
  //     const formattedName = name
  //       .toLowerCase()
  //       .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
  //       .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
  //     setSlugPreview(`${category.path}/${formattedName}/${uid}`);
  //   }
  // }, [category, name, uid]);

  // Render categories with hierarchy
  const renderCategoryOptions = (categories: ICategory[]) => {
    return categories.map((cat, idx) => {
      // const currentPath = parentPath ? `${parentPath}/${cat.slug}` : cat.slug;

      return (
        <React.Fragment key={idx}>
          <option value={cat?._id} >
            {cat?.name}
            {/* {"—".repeat(currentPath.split("/").length - 1)} {cat.name} */}
          </option>
          {/* Render child categories recursively */}
          {/* {cat.children && renderCategoryOptions(cat.children, currentPath)} */}
        </React.Fragment>
      );
    });
  };

console.log('categories', categories, 'selected category', category);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.id) {
      alert("Please select a category.");
      return;
    }

    const productData = {
      title: name,
      description: description,
      specification: specification,
      price: price,
      discount: discount,
      discountAmount: discountAmount,
      category: category.id,
      image: { url: mainImage || "", alt: name },
      video: { url: video || "", alt: "Product Video" },
      //   brochure: { url: pdf || "", filename: pdfNmae },
      status: status ? "published" : "draft",
      featured: featured,
      newlyArrived: newlyarrived,
      // slug: slugPreview, // Include slug in the request
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/post`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        alert(`Post added!`);
        setDisplay("products");
      } else {
        alert(`Failed to add product: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {loading && <p>Loading categories...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {categories && (
        <form
          className="w-full max-w-[84%] text-secondary text-lg flex justify-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            {/* Main Image Upload */}
            <div className="w-full flex gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="file">Post Image</label>
                {mainImage ? (
                  <img
                    className="max-w-[260px] h-[360px] rounded-md border border-borderColor my-1"
                    src={mainImage}
                    alt="Main"
                  />
                ) : (
                  <div className="min-w-[260px] h-[360px] rounded-md border border-borderColor my-1 flex justify-center items-center flex-col">
                    <FontAwesomeIcon icon={faImage} className="w-20 h-20 " />
                    <span>260x360</span>
                  </div>
                )}
                <ImageUploader onUploadSuccess={(link) => setMainImage(link)} />
              </div>
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="pdf">Product brochure</label>
                {pdf ? (
                  <div className="w-[260px] h-[360px] rounded-md border border-borderColor my-1 flex flex-col justify-center items-center p-2 gap-2">
                    <FontAwesomeIcon icon={faFilePdf} className="w-20 h-20 " />
                    {pdfNmae}
                  </div>
                ) : (
                  <div className="min-w-[260px] h-[360px] rounded-md border border-borderColor my-1 flex justify-center items-center flex-col">
                    <FontAwesomeIcon icon={faFilePdf} className="w-20 h-20 " />
                  </div>
                )}
                <PdfUploader
                  setPdfName={setPdfname}
                  onUploadSuccess={(link) => setPdf(link)}
                />
              </div> */}
              <div className="flex flex-col gap-2">
                <label>Post Video</label>
                {video ? (
                  <video
                    className="max-w-[260px] h-[360px] rounded-md border border-borderColor my-1"
                    src={video}
                    controls
                  />
                ) : (
                  <div className="min-w-[260px] h-[360px] rounded-md border border-borderColor my-1 flex justify-center items-center flex-col">
                    <FontAwesomeIcon icon={faVideo} className="w-20 h-20" />
                  </div>
                )}
                <VideoUploader onUploadSuccess={(link) => setVideo(link)} />{" "}
                {/* Reusing ImageUploader */}
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-4">
              <label htmlFor="title">Post Name</label>
              <input
                className="w-full h-10 rounded-md border border-bcollor pl-3"
                id="title"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Price and Discount */}
            <div className="flex gap-4 mb-4 items-center">
              <div className="flex-1">
                <label htmlFor="price">Price</label>
                <input
                  className="w-full h-10 rounded-md border border-bcollor pl-3"
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>
              <div className="  flex items-center">
                <input
                  id="discount"
                  type="checkbox"
                  checked={discount}
                  onChange={(e) => setDiscount(e.target.checked)}
                />
                <label htmlFor="discount" className="ml-2">
                  Discount Available
                </label>
              </div>
              <div className="flex-1">
                <label htmlFor="discountAmount">
                  Discount Amount By Percentage
                </label>
                <input
                  className="w-full h-10 rounded-md border border-bcollor pl-3"
                  id="discountAmount"
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Category Selection with Hierarchy */}
            <div className="mb-4">
              <label htmlFor="category">Category</label>
              <select
                className="w-full h-10 rounded-md border border-bcollor pl-3"
                id="category"
                value={category.id}
                onChange={(e) => {
                  // const selectedOption =
                  //   e.target.options[e.target.selectedIndex];
                  // // const path = selectedOption.getAttribute("data-path");
                  setCategory({ id: e.target.value });
                }}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {renderCategoryOptions(categories)}
              </select>
            </div>

            {/* Slug Preview */}
            {/* <div className="mb-4">
              <label>Generated Slug (URL)</label>
              <p className="text-gray-500">
                {slugPreview ? `/${slugPreview}` : "Slug will appear here"}
              </p>
            </div> */}
            <div className="mb-4">
              <label htmlFor="description">Specification</label>
              <textarea
                className="w-full rounded-md border border-bcollor p-3"
                id="specification"
                name="specification"
                rows={4}
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-full rounded-md border border-bcollor p-3"
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Status and Discount */}

            {/* <div className="mb-4 flex items-center">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <label htmlFor="featured" className="ml-2">
                Featured
              </label>
            </div> */}
            <div className="mb-4 flex items-center">
              <input
                id="newlyarrived"
                type="checkbox"
                checked={newlyarrived}
                onChange={(e) => setnewlyArrived(e.target.checked)}
              />
              <label htmlFor="newlyarrived" className="ml-2">
                Popular Field
              </label>
            </div>
            {/* <div className="mb-4 flex items-center">
              <input
                id="status"
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
              <label htmlFor="status" className="ml-2">
                Publish
              </label>
            </div> */}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 rounded-md text-primary text-2xl bg-action"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
