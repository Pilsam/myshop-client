"use client"

import { useState, useEffect } from 'react';
import { MyContext } from "./ThemeContext";
import { fetchDataFromApi, postData } from '@/utils/api';

const ThemeProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [headerSearchCatListValue, setHeaderSearchCatListValue] = useState("");
  const [searchKeyword, setsearchKeyword] = useState();
  const [searchData, setSearchData] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState();
  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);

  useEffect(() => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
    getCartData(`/api/cart-datas`);
  }, []);

  const getCartData = (url) => {
    fetchDataFromApi(url).then(res => {
      setCartItems(res.data);
    });
  };

  const addToCart = async (item) => {
    const imageData = item?.attributes?.productImages?.data;
    const imgUrl =
      imageData && imageData.length > 0
        ? imageData[0]?.attributes?.url
        : "/no-image.png"; // fallback image

    const cart_Data = {
      data: {
        productName: item?.attributes?.name || "Unnamed Product",
        price: parseInt(item?.attributes?.price) || 0,
        oldPrice: parseInt(item?.attributes?.oldPrice) || 0,
        product_weight: "",
        productSize: "",
        productRAM: "",
        discount: item?.attributes?.discount || 0,
        brand: item?.attributes?.brand || "Generic",
        rating: item?.attributes?.rating || 0,
        description: item?.attributes?.description || "",
        quantity: 1,
        imgUrl,
        productId: item?.id,
        products: item?.id,
      },
    };

    postData("/api/cart-datas", cart_Data).then(() => {
      getCartData(`/api/cart-datas`);
    });
  };

  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  };

  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  };

  const openFilters = () => {
    setIsopenFilters(!isOpenFilters);
  };

  const value = {
    productData,
    setProductData,
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    signOut,
    signIn,
    openFilters,
    headerSearchCatListValue,
    setHeaderSearchCatListValue,
    setSearchData,
    searchData,
    setsearchKeyword,
    searchKeyword,
    setCartItems,
    getCartData,
    setCartTotalAmount,
    cartTotalAmount,
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export default ThemeProvider;
