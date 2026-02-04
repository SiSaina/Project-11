'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Confirmation from "@/components/Confirmation";

const OrderList = () => {

    const { OrderDetails, currency } = useAppContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    useEffect(() => {
        if (OrderDetails.length > 0) {
            setLoading(false);
        }
    }, [OrderDetails]);

  const confirmDelete = (order) => {
    setOrderToDelete(order);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;

    await removeOrder(orderToDelete.id);
    setShowConfirm(false);
    setOrderToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setOrderToDelete(null);
  };


    if (OrderDetails.length === 0) return <Loading />;

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            <div className="md:p-10 p-4 space-y-5">
                <h1 className="text-lg font-medium pl-2">Orders</h1>
                <div className="max-w-4xl rounded-md">
                    {OrderDetails.map((OrderDetails, index) => (
                        <div key={index}
                            className="
                                group
                                flex flex-col md:flex-row justify-between
                                p-5 m-2 rounded-lg
                                border border-gray-300
                                bg-white
                                cursor-pointer
                                transition-all duration-300 ease-out
                                hover:shadow-lg hover:-translate-y-1
                                hover:border-gray-500
                                active:scale-[0.98]">
                            <div className="flex-1 flex gap-5 max-w-80"
                                onClick={() => router.push(`/seller/order-list/${OrderDetails.id}/view`)}>
                                <Image
                                    className="max-w-16 max-h-16 object-cover transition-transform duration-300 group-hover:scale-105"
                                    src={assets.box_icon}
                                    alt="box_icon"
                                />

                                <p className="flex flex-col">
                                    <span className="font-medium">{OrderDetails.order.product.name}</span>
                                    <span>Qty: {OrderDetails.order.quantity}</span>
                                    <span>{OrderDetails.order.product.price} {currency}</span>
                                    <span className="font-semibold text-gray-700 group-hover:text-black transition-colors">
                                        Total: {OrderDetails.order.product.price * OrderDetails.order.quantity} {currency}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="flex flex-col">
                                    <span className="font-medium">{OrderDetails.address.fullName}</span>
                                    <span>{OrderDetails.address.streetName}</span>
                                    <span>{OrderDetails.address.suburb}</span>
                                    <span>{OrderDetails.address.city}</span>
                                    <span>{OrderDetails.address.country}</span>
                                    <span>{OrderDetails.address.postalCode}</span>
                                </p>
                            </div>
                            <div>
                                <p className="flex flex-col">
                                    <span>Order date : {new Date(OrderDetails.date).toLocaleDateString()}</span>
                                    <span>Payment : Pending</span>
                                    <span>Delivery : Pending</span>
                                </p>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button
                                    onClick={() => router.push(`/seller/order-list/${OrderDetails.id}/edit`)}
                                    className="flex items-center h-10 gap-1 px-3 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-800 active:scale-95"
                                >
                                    <span className="hidden md:block">Edit</span>
                                    <Image className="h-3.5" src={assets.redirect_icon} alt="edit" />
                                </button>
                                <button
                                    onClick={() => confirmDelete(OrderDetails)}
                                    className="flex items-center h-10 gap-1 px-3 py-2 bg-red-600 text-white rounded-md transition hover:bg-red-800 active:scale-95"
                                >
                                    <span className="hidden md:block">Remove</span>
                                    <Image className="h-3.5" src={assets.redirect_icon} alt="remove" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      <Footer />
      <Confirmation
        open={showConfirm}
        message="Are you sure you want to delete this order?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
        </div>
    );
};

export default OrderList;