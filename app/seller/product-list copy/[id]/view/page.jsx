'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets } from "@/assets/assets";
import { getProduct } from '@/services/product';
import Loading from '@/components/Loading';

const ProductView = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await getProduct({
        id,
        includeImages: true,
        includeCategory: true,
      });

      setProductData(res.data);
      setMainImage(res.data.images?.[0]?.url || assets.girl_with_earphone_image);
    } catch (err) {
      console.error('Failed to fetch product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!productData) return <p className="text-center py-20">Product not found</p>;

  return productData ? (<div className="flex-1 min-h-screen flex flex-col justify-between">
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <Image
              src={mainImage || productData.image[0]}
              alt="alt"
              className="w-full h-auto object-cover mix-blend-multiply"
              width={1280}
              height={720}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {(productData.images || []).map((imgObj, index) => {
              const imageUrl = imgObj?.url;
              if (!imageUrl?.trim()) return null;

              const isSelected = mainImage === imageUrl;

              return (
                <div
                  key={index}
                  onClick={() => setMainImage(imageUrl)}
                  className={`cursor-pointer rounded-lg overflow-hidden ${isSelected ? 'bg-gray-300' : 'bg-gray-500/10'
                    }`}
                >
                  <Image
                    src={imageUrl}
                    alt="product image"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
            {productData.name}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
              <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
              <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
              <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
              <Image
                className="h-4 w-4"
                src={assets.star_dull_icon}
                alt="star_dull_icon"
              />
            </div>
            <p>(4.5)</p>
          </div>
          <p className="text-gray-600 mt-3">
            {productData.description}
          </p>
          <p className="text-3xl font-medium mt-6">
            Offer price: <span className="text-gray-500">${productData.offerPrice}</span>
          </p>
          <p className="text-3xl font-medium mt-6">
            Price: <span className="text-gray-500">${productData.price}</span>
          </p>
          <p className="text-3xl font-medium mt-6">
            Date upload: <span className="text-gray-500">{productData.date}</span>
          </p>
          <hr className="bg-gray-600 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-800/50 ">Generic</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-800/50 ">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">
                    {productData.category?.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  ) : <Loading />
};

export default ProductView;
