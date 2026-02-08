'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const OrderEdit = () => {
  const { id } = useParams();
  const router = useRouter();
  const { OrderDetails, currency, updateOrder } = useAppContext();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    status: "",
    paymentStatus: "",
    deliveryStatus: "",
  });

  useEffect(() => {
    if (!OrderDetails?.length) return;

    const found = OrderDetails.find(o => o.id === Number(id));
    if (!found) return;

    setOrder(found);
    setForm({
      status: found.status,
      paymentStatus: found.paymentStatus ?? "pending",
      deliveryStatus: found.deliveryStatus ?? "pending",
    });
    setLoading(false);
  }, [OrderDetails, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateOrder(order.id, form);
      router.back();
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  if (loading || !order) return <Loading />;

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-gray-50 text-sm">
      <div className="md:p-10 p-4 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              Edit Order #{order.id}
            </h1>
            <p className="text-gray-500">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h2 className="font-medium text-lg">Product</h2>
          <div className="flex gap-6">
            <Image
              src={
                order.order.product.images?.[0]?.url ||
                assets.box_icon
              }
              alt="product"
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-base">
                {order.order.product.name}
              </span>
              <span className="text-gray-600">
                {order.order.product.description}
              </span>
              <span>Qty: {order.order.quantity}</span>
              <span>
                Price: {order.order.product.price} {currency}
              </span>
              <span className="font-semibold">
                Total: {order.order.product.price * order.order.quantity} {currency}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-2">
            <h2 className="font-medium text-lg">Customer</h2>
            <p><span className="text-gray-500">Name:</span> {order.user.name}</p>
            <p><span className="text-gray-500">Email:</span> {order.user.email}</p>
            <p><span className="text-gray-500">Phone:</span> {order.user.phone ?? "N/A"}</p>
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
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h2 className="font-medium text-lg">Order Status</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-500 mb-1">Order</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Payment</label>
              <select
                name="paymentStatus"
                value={form.paymentStatus}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Delivery</label>
              <select
                name="deliveryStatus"
                value={form.deliveryStatus}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderEdit;
