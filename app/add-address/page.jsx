'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { postAddress } from "@/services/address";
import { useEffect, useState } from "react";
import { getUser } from "@/services/user";

const AddAddress = () => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] =  useState(null);
    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        postalCode: '',
        streetName: '',
        suburb: '',
        city: '',
        country: '',
        userId: ''
    })

    useEffect(()=>{
        const fetchUser = async () => {
            try{
                const user = await getUser();
                setUserId(user.id);
                setAddress(prev => ({ ...prev, userId: user.id}));
            } catch(err){
                console.error("Error: ", err);
            };
        };
        fetchUser();
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await postAddress({ ...address, userId });
            setAddress({
                fullName: '',
                phoneNumber: '',
                postalCode: '',
                streetName: '',
                suburb: '',
                city: '',
                country: '',
                userId
            })
        } catch (error) {
            console.error('Add address errors:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form onSubmit={onSubmitHandler} className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-orange-600">Address</span>
                    </p>
                    <div className="space-y-3 max-w-sm mt-10">
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Full name"
                            required
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Phone number"
                            required
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Postal code"
                            required
                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                            value={address.postalCode}
                        />
                        <textarea
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
                            type="text"
                            rows={4}
                            placeholder="Street name"
                            required
                            onChange={(e) => setAddress({ ...address, streetName: e.target.value })}
                            value={address.streetName}
                        ></textarea>
                        <div className="flex space-x-3">
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="Suburb"
                                required
                                onChange={(e) => setAddress({ ...address, suburb: e.target.value })}
                                value={address.suburb}
                            />
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="City"
                                required
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                            />
                        </div>
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Country"
                            required
                            onChange={(e) => setAddress({ ...address, country: e.target.value })}
                            value={address.country}
                        />
                    </div>
                    <button type="submit" className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase">
                        Save address
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;