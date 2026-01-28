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
                                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
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
                                        <div className="border rounded-md p-4">
                                            <h4 className="font-medium mb-2">Product</h4>
                                            <p className="text-sm text-gray-600">
                                                Product ID: {orderDetail.order.productId}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {orderDetail.order.quantity}
                                            </p>
                                        </div>
                                        <div className="border rounded-md p-4">
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
                                        <div className="border rounded-md p-4">
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