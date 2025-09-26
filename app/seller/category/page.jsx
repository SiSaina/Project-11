'use client'
import React, { useEffect, useState } from "react";
import { getCategory, postCategory } from "@/services/category";

const Category = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      setCategories(data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch categories: ", error.message);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postCategory({name});
      setName("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error.message);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg w-full border rounded-lg shadow bg-white"
      >
        <h1 className="text-2xl font-bold text-center">Add Category</h1>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category-name">
            Category Name
          </label>
          <input
            id="category-name"
            type="text"
            placeholder="Enter category name"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-2.5 bg-orange-600 text-white font-medium rounded disabled:opacity-50"
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
            {categories.length > 0 ? (
              categories.map((cat) => (
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
