'use client';

import React, { useState } from "react";
import { postCategory } from "@/services/category";
import { useAppContext } from "@/context/AppContext";

const Category = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { Categories, fetchCategories } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await postCategory({ name: name.trim() });
      setName("");
      if (fetchCategories) {
        await fetchCategories();
      }
    } catch (error) {
      console.error("Failed to create category:", error.message);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-center items-center gap-6 px-4 md:px-10">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg border rounded-lg shadow bg-white p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Add Category</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="category-name" className="text-base font-medium">
            Category Name
          </label>
          <input
            id="category-name"
            type="text"
            placeholder="Enter category name"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-orange-600 text-white font-medium rounded hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      <div className="w-full max-w-3xl border rounded-lg shadow bg-white overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {Categories?.length > 0 ? (
              Categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="border px-4 py-2">{cat.id}</td>
                  <td className="border px-4 py-2">{cat.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
