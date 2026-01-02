'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, logout as logoutService, register as registerService } from "@/services/auth";
import { getUser, getUserAddress } from "@/services/user"
import { getOneProduct, getProduct } from "@/services/product";
import { isHTTPMethod } from "next/dist/server/web/http";
export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [userData, setUserData] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    // const fetchProductData = async () => {
    //     setProducts(productsDummyData)
    // }

    const fetchProductData = async () => {
        try {
            const data = await getProduct(true, true, true);
            setProducts(data.data ?? []);
        } catch (err) {
            console.error("Failed to fetch product: ", err);
        }
    }
    const fetchOneProduct = async () => {
        try {
            const data = await getOneProduct();
            setProduct(data);
        } catch (err) {
            console.error("Failed to fetch product: ", err);
        }
    }

    const fetchUserData = async () => {
        try {
            const data = await getUser();
            setUserData(data);

            const isSeller = data?.role_id === 1 || data?.role_id === 2;
            setIsSeller(isSeller);
        } catch (err) {
            console.warn("User not logged in or failed to fetch user:", err);
            setUserData(null);
        }
    }

    const register = async (name, email, password, password_confirmation) => {
        const user = await registerService(name, email, password, password_confirmation);
        if (user) {
            setUserData(user);
            const isSeller = user?.role_id === 1 || user?.role_id === 2;
            setIsSeller(isSeller);
            router.push('/');
        }
    }
    const login = async (email, password) => {
        const user = await loginService(email, password);
        if (user) {
            const fullUser = await getUser();
            setUserData(fullUser);

            const isSeller = fullUser?.role_id === 1 || fullUser?.role_id === 2;
            setIsSeller(isSeller);

            router.push('/');
        }
    }
    const logout = async () => {
        await logoutService();
        setUserData(null);
        setIsSeller(false);
        router.push('/');
    }

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((p) => String(p.id) === String(itemId));

            if (itemInfo) {
                totalAmount += itemInfo.offerPrice * cartItems[itemId];
            }
        }
        return Math.round(totalAmount * 100) / 100;
    };


    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData();
    }, [])

    const value = {
        register,
        login, logout,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        product, fetchOneProduct,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}