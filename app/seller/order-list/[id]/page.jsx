'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const OrderDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const { OrderDetails, currency } = useAppContext();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (OrderDetails.length === 0) return;
        const found = OrderDetails.find(o => o.id === Number(id));
        setOrder(found || null);
        setLoading(false);
    }, [OrderDetails, id]);

    if (!order) return <Loading />;

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm bg-gray-50">
            <div className="md:p-10 p-4 max-w-5xl mx-5 border border-gray-400 rounded-md space-y-6">
                <button
                    onClick={() => router.back()}
                    className="text-sm text-gray-500 hover:text-black transition"
                >
                    ← Back to Orders
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">Order #{order.id}</h1>
                        <p className="text-gray-500 text-sm">
                            Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                    </div>
                    <span className="px-4 py-1 rounded-full text-sm font-medium
                    bg-yellow-100 text-yellow-700 w-fit">
                        {order.status.toUpperCase()}
                    </span>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
                    <h2 className="font-medium text-lg">Product</h2>
                    <div className="flex gap-6">
                        <Image
                            src={assets.box_icon}
                            alt="product"
                            className="w-24 h-24 object-cover rounded-md border"
                        />
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-base">{order.order.product.name}</span>
                            <span>{order.order.product.description}</span>
                            <span>Product date: {order.order.product.date}</span>
                            <span>Qty: {order.order.quantity}</span>
                            <span>Price: {order.order.product.price} {currency}</span>
                            <span className="font-semibold">Total: {order.order.product.price * order.order.quantity} {currency}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-2">
                        <h2 className="font-medium text-lg">Customer</h2>
                        <p><span className="text-gray-500">Name:</span> {order.user.name}</p>
                        <p><span className="text-gray-500">Email:</span> {order.user.email}</p>
                        <p>
                            <span className="text-gray-500">Phone:</span>{" "}
                            {order.user.phone ?? "N/A"}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-2">
                        <h2 className="font-medium text-lg">Shipping Address</h2>
                        <p className="text-gray-700">
                            {order.address.fullName}<br />
                            {order.address.streetName}, {order.address.suburb}<br />
                            {order.address.city}, {order.address.country}<br />
                            {order.address.postalCode}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="font-medium text-lg mb-4">Order Status</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Order date</span>
                            <p className="text-yellow-600 font-medium">{order.date}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Payment</span>
                            <p className="text-yellow-600 font-medium">Pending</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Delivery</span>
                            <p className="text-yellow-600 font-medium">Pending</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Order ID</span>
                            <p className="font-medium">{order.orderId}</p>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );

};

export default OrderDetail;
