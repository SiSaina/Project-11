'use client';
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getUserOrderDetail } from "@/services/orderDetail";

const MyOrders = () => {

    const { userData } = useAppContext();
    const [userOrders, setUserOrders] = useState();

    const fetchUserOrders = async (userId) => {
        try {
            const data = await getUserOrderDetail(userId);
            setUserOrders(data.data);
        } catch (error) {
            console.error("Failed to fetch user orders: ", error);
        }
    }

    useEffect(() => {
        if (userData?.id) {
            fetchUserOrders(userData.id);
        }
    }, [userData]);


    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {userOrders?.length > 0 ? (
                        <div className="space-y-6">
                            {userOrders.map((orderDetail) => (
                                <div
                                    key={orderDetail.id}
                                    className="rounded-lg border border-gray-400 bg-white p-5 shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                Order #{orderDetail.orderId}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Date: {orderDetail.date}
                                            </p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 text-sm rounded-full capitalize ${orderDetail.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-green-100 text-green-700'
                                                }`}
                                        >
                                            {orderDetail.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="border border-gray-500 rounded-md p-4 flex gap-4">
                                            <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                                {orderDetail.order.product.images?.length > 0 ? (
                                                    <img
                                                        src={orderDetail.order.product.images[0].url}
                                                        alt={orderDetail.order.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="border rounded-md bg-gray-300 w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800">
                                                    {orderDetail.order.product.name}
                                                </h4>

                                                <p className="text-sm text-gray-500 line-clamp-2">
                                                    {orderDetail.order.product.description}
                                                </p>

                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="text-sm">
                                                        <span className="font-medium text-gray-800">
                                                            ${orderDetail.order.product.price}
                                                        </span>
                                                    </div>
                                                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                                        Qty: {orderDetail.order.quantity}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    Total: ${orderDetail.order.product.price * orderDetail.order.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border border-gray-500 rounded-md p-4">
                                            <h4 className="font-medium mb-2">User</h4>
                                            <p className="text-sm text-gray-600">
                                                Name: {orderDetail.user.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Email: {orderDetail.user.email}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Phone: {orderDetail.user.phone}
                                            </p>
                                        </div>
                                        <div className="border border-gray-500 rounded-md p-4">
                                            <h4 className="font-medium mb-2">Address</h4>
                                            <p className="text-sm text-gray-600">
                                                {orderDetail.address.fullName}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {orderDetail.address.streetName}, {orderDetail.address.suburb}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {orderDetail.address.city}, {orderDetail.address.postalCode}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {orderDetail.address.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No orders found</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;