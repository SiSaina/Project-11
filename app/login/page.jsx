'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { assets } from "@/assets/assets";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAppContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg sm:max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In to Your Account</h1>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label htmlFor="remember" className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="mr-2"
                                />
                                Remember me
                            </label>
                            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Login
                        </button>
                    </form>
                    <div className="my-6 border-t border-gray-200"></div>
                    <div className="text-center text-sm text-gray-600 mb-3">Or login with</div>
                    <div className="flex flex-row gap-4 justify-center flex-wrap">
                        <a href="/auth/google" className="flex justify-center items-center bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition">
                            <Image src={assets.google_icon} alt="Google" className="w-5 h-5 mr-2" />
                            Google
                        </a>
                        <a href="/auth/github" className="flex justify-center items-center bg-black text-white py-2 px-6 rounded-md hover:bg-gray-900 transition">
                            <Image src={assets.github_icon} alt="GitHub" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
                            GitHub
                        </a>
                        <a href="/auth/facebook" className="flex justify-center items-center bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                            <Image src={assets.facebook_icon_2} alt="Facebook" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
                            Facebook
                        </a>
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-500 hover:underline">Register</a>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );


}
export default LoginPage;