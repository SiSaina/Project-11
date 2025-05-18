'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { deleteProduct, getProduct } from "@/services/product";
import Confirmation from "@/components/Confirmation";

const ProductList = () => {

  const { router } = useAppContext()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchSellerProduct = async () => {
    try {
      const data = await getProduct({ includeImages: true, includeCategory: true });
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProduct();
  }, []);

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    if (!productToDelete) return;

    const previousProducts = [...products];
    setProducts(products.filter(p => p.id !== productToDelete));

    try {
      await deleteProduct(productToDelete);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
      setProducts(previousProducts);
    }

    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Product</h2>
        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className=" table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/6 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate">Price</th>
                <th className="px-4 py-3 font-medium truncate">Offer price</th>
                <th className="md:w-2/6 px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2">
                      <Image
                        src={product.images?.[0]?.url || assets.girl_with_earphone_image}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category?.name}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3">${product.offerPrice}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <div className="flex gap-2">
                      <button onClick={() => router.push(`/seller/product-list/${product.id}/view`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                        <span className="hidden md:block">Visit</span>
                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                      <button onClick={() => router.push(`/seller/product-list/${product.id}/edit`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-blue-600 text-white rounded-md">
                        <span className="hidden md:block">Edit</span>
                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                      <button onClick={() => confirmDelete(product.id)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-red-600 text-white rounded-md">
                        <span className="hidden md:block">Remove</span>
                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      <Footer />
      <Confirmation
        open={showConfirm}
        message="Are you sure you want to delete this?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProductList;