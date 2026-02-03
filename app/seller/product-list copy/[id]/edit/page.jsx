'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { getCategory } from "@/services/category";
import { getProduct, postProduct, putProduct } from "@/services/product";
import { postImage } from "@/services/image";
import { useParams, useRouter } from "next/navigation";
const editProduct = () => {

  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [productDate, setProductDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const data = await getProduct({ id, includeCategory: true, includeImages: true });
      const product = data.data;
      setName(product.name ?? '');
      setDescription(product.description ?? '');
      setPrice(product.price?.toString() ?? '');
      setOfferPrice(product.offerPrice?.toString() ?? '');
      setProductDate(product.date ?? '');
      setSelectedCategoryName(product.category?.name ?? '');

    } catch (error) {
      console.error("Failed to load product:", error.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategory();
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCatObj = categories.find(cat => cat.name === selectedCategoryName);
    const categoryId = selectedCatObj ? selectedCatObj.id : null;
    const productData = {
      id,
      name,
      description,
      categoryId,
      price: parseFloat(price),
      offerPrice: parseFloat(offerPrice),
      date: productDate,
    };

    try {
      setLoading(true);
      await putProduct(id, productData);
      router.push(`/seller/product-list/${id}/view`);
    } catch (error) {
      console.error("Failed to update product:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">Category</label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              value={selectedCategoryName}
              required
              disabled={loading}
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
        <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">ADD</button>
      </form>
    </div>
  );
};

export default editProduct;