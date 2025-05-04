"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  root: string;
  children: ICategory[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRootCategory{
  title: string;
}

export const AllCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [rootCategories, setRootCategories] = useState<IRootCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [rootFlag, setRootFlag] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [rootSelect, setRootSelect] = useState<string>("");
  const [rootInput, setRootInput] = useState<string>("");
  // const [parent, setParent] = useState<string | undefined>();
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories/all`
      );
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        setCategories(data?.data);
      } else {
        setError(data.message || "Failed to fetch categories.");
      }
    } catch (err) {
      console.log("Error fetching categories:", err);
      // setError("An error occurred while fetching categories.");
    } finally {
      setLoading(false);
      console.log("Error fetching categories:");
    }
  };

  const fetchRootCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories/rootCategories`
      );
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        setRootCategories(data);
        // setRootFlag(true);
      } else {
        // setRootFlag(false);
        setError(data.message || "Failed to fetch categories.");
      }
    } catch (err) {
      console.error("Error root fetching categories:", err);
      setError("An error occurred while fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRootCategories();
  }, []);

  console.log(
    "fetched categories",
    categories,
    "root categories",
    rootCategories,
    "root",
    rootInput,
    rootSelect,
    editingCategoryId
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const url = editingCategoryId
        ? `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories/update/${editingCategoryId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories`;

      const method = editingCategoryId ? "PUT" : "POST";
      if (!rootSelect && !rootInput) {
        alert("Please select or enter a root category.");
        return;
      }
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          icon,
          root: rootInput || rootSelect || null,
        }),
      });

      if (response.ok) {
        alert(
          editingCategoryId
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
        resetForm(); // Reset form fields
        fetchCategories(); // Refresh categories after creating/updating
      } else {
        const errorData = await response.json();

        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Please try again.");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/categories/${id}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          alert("Category deleted successfully!");
          fetchCategories();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
  };

  const handleEditCategory = (category: ICategory) => {
    const scrollableDiv = document.querySelector(".scrolar"); // Adjust the selector
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setEditingCategoryId(category._id);
    setName(category.name);
    setRootInput(category.root || "");
    setRootSelect(category.root || "");
  };

  const resetForm = () => {
    setEditingCategoryId(null);
    setName("");
    setIcon("");
    setRootSelect("");
    setRootInput("");
  };

  const renderCategories = (categories: ICategory[]) =>
    categories.map((category) => (
      <div key={category._id} className="ml-4 text-paragraph">
        <div className="bg-borderColor font-semibold flex items-center justify-between gap-4 rounded-md mt-2 px-4 py-2">
          <span>{category.name}</span>
          <div className="flex gap-3">
            <button
              onClick={() => handleEditCategory(category)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        {/* {category.children.length > 0 && (
					<div className='ml-4 border-l pl-4'>
						{renderCategories(category.children)}
					</div>
				)} */}
      </div>
    ));

  const renderRootCategoryOptions = (categories: IRootCategory[]) => {
    return categories.map((cat, idx) => {
      // const currentPath = parentPath ? `${parentPath}/${cat.slug}` : cat.slug;

      return (
        <React.Fragment key={idx}>
          <option value={cat.title}>
            {cat?.title}
            {/* {"—".repeat(currentPath.split("/").length - 1)} {cat.name} */}
          </option>
          {/* {cat.children && renderRootCategoryOptions(cat.children, currentPath)} */}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] max-w-[1200px]">
        <h2 className="text-2xl text-heading font-bold mb-4">
          {editingCategoryId ? "Edit Category" : "Create Category"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-paragraph">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-paragraph"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-paragraph"
            >
              Category Icon
            </label>
            <input
              id="icon"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="root"
              className="block text-sm font-medium text-paragraph"
            >
              Root Category
            </label>

            <div className="flex gap-5">
              <div className="flex flex-col">
                <p>Select a root</p>
                <select
                  id="rootSelect"
                  className="mt-1 block w-full text-paragraph px-3 py-2 border border-borderColor rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={rootSelect}
                  onChange={(e) => {
                    setRootSelect(e.target.value);
                    if (e.target.value !== "") setRootInput(""); // Clear input if select is chosen
                  }}
                  disabled={!!rootInput} // disable if input is filled
                >
                  <option value="">None (Root Category)</option>
                  {renderRootCategoryOptions(rootCategories)}
                </select>
              </div>
              <p>or</p>
              <div className="flex flex-col">
                <p>Add a new root</p>
                <input
                  id="rootInput"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={rootInput}
                  onChange={(e) => {
                    setRootInput(e.target.value);
                    if (e.target.value !== "") setRootSelect(""); // Clear select if input is typed
                  }}
                  disabled={!!rootSelect} // disable if select is filled
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-grow bg-gradient-to-r from-secondary to-action text-primary py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {editingCategoryId ? "Update Category" : "Create Category"}
            </button>
            {editingCategoryId && (
              <button
                type="button"
                className="bg-gray-300 text-paragraph py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        <div className="w-fit flex flex-col gap-3 mt-3">
          {loading && <p>Loading categories...</p>}
          {error && <p className="text-action">{error}</p>}
          {!loading && !error && renderCategories(categories)}
        </div>
      </div>
    </div>
  );
};
