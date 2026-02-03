'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const OrderList = () => {

    const { OrderDetails, currency } = useAppContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (OrderDetails.length > 0) {
            setLoading(false);
        }
    }, [OrderDetails]);

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <h1 className="text-lg font-medium pl-2">Orders</h1>
                <div className="max-w-4xl rounded-md">
                    {OrderDetails.map((OrderDetails, index) => (
                        <div key={index}
                            onClick={() => router.push(`/seller/order-list/${OrderDetails.id}`)}
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
                            <div className="flex-1 flex gap-5 max-w-80">
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
                        </div>
                    ))}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default OrderList;