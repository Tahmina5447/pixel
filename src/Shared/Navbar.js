import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBagCheck } from "react-icons/bs";

import Link from "next/link";
import CartDrawer from "./drawer/CartDrawer";
import CreateContext from "../Components/CreateContex";
import WishlilstDrawer from "./drawer/WishlilstDrawer";
import CatagoryMenu from "./CatagoryMenu";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import AuthUser from "../../lib/AuthUser";
import { useMyShopData, useUserData } from "../hooks/useMyShopData";
import { SlUser } from "react-icons/sl";
import NavbarSearch from "../Components/NavbarSerach/NavbarSearch";
import LogoLoader from "./LogoLoader";
import Image from "next/image";
import { HiMenuAlt1 } from "react-icons/hi";
import CatagoryDrawer from "./drawer/CatagoryDrawer";
import { Icon } from "@iconify/react";
import NaveCategory from "./NaveCategory";
import SiebarMenu from "../Components/Home/Banner/SiebarMenu";
import { useQuery } from "react-query";
import server_url, { server_url_v3 } from "../../lib/config";
const Navbar = () => {
  const router = useRouter();
  const { logout } = AuthUser();
  const [isOpenCatgory, setIsOpenCatgory] = useState(false);
  const {
    addToCartRefresher,
    isOpen,
    setIsOpen,
    localStorageCartItems,
    setlocalStorageCartItems,
    localStorageWishlistItems,
    setlocalStorageWishlistItems,
    wishlistRefresher,
    isOpenWishlist,
    setIsOpenWishlist,
    user,
    token,
    setUser,
    setToken,
    setQueryFromCategory,

  } = useContext(CreateContext);


  const { data: noticesData, error: noticeError, isLoading: noticeLoading } = useQuery('noticesData', async () => {
    const response = await fetch(`${server_url_v3}/custom?modelName=Notice`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const notice = noticesData?.data?.result
  const [currentNotice, setCurrentNotice] = useState(0);
  useEffect(() => {
    if (notice?.length > 0) {
      const interval = setInterval(() => {
        setCurrentNotice((prev) => (prev + 1) % notice?.length);
      }, 6000); // Change notice every 6 seconds (4 seconds stay time + 2 seconds for animations)
      return () => clearInterval(interval);
    }
  }, [notice?.length]);

  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useQuery('categoryData', async () => {
    const response = await fetch(`${server_url}/category?status=true`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  // console.log(categoryData)
  const userRole = user?.role;
  const { isLoading, data: shopData, error } = useMyShopData();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    const token = localStorage.getItem("access");
    setUser(user);
    setToken(token);
  }, [router, setUser, setToken]);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user_info"));
  //   const token = localStorage.getItem("access");
  //   setUser(user);
  //   setToken(token);
  // }, [router, setUser, setToken]);

  const { pathname } = useRouter();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // ---------use for open wishlist drawer--------------
  const toggleDrawerWishlist = () => {
    setIsOpenWishlist(!isOpenWishlist);
  };

  useEffect(() => {
    const carts = reactLocalStorage.getObject("shopping-cart", true);
    const cart = JSON.parse(carts);
    setlocalStorageCartItems(cart);

    const wishilists = reactLocalStorage.getObject("wishlist", true);
    const wishilist = JSON.parse(wishilists);
    setlocalStorageWishlistItems(wishilist);
  }, [
    setlocalStorageCartItems,
    setlocalStorageWishlistItems,
    wishlistRefresher,
    addToCartRefresher,
  ]);

  const handleLogOut = () => {
    // reactLocalStorage.clear();
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleAdminDashboard = async () => {
    await router.push("/admin/dashboard");
  };
  const handleUserDashboard = async () => {
    await router.push("/user/dashboard");
  };

  const toggleDrawerCatagory = () => {
    setIsOpenCatgory(!isOpenCatgory);
  };

  return (
    <div className="bg-white">
      {/* ------top small menu------------------ */}
      <div className="bg-[#d4b3d5] py-1.5 overflow-hidden ">
        {/* <Marquee>
          <div className=' flex items-center justify-between w-full'>
            {notice?.map((singleNotice) =>
              <span key={singleNotice?._id} className="text-sm text-black font-[600] text-center  mr-5 lg:mr-16 avenir2">
                {singleNotice?.notice}
              </span>
            )}
          </div>

        </Marquee> */}
        <div className="notice-container">
      {notice?.length > 0 && (
        <div key={notice[currentNotice]._id} className=" notice">
          <span className="text-sm text-black font-[600] text-center avenir2">{notice[currentNotice].notice}</span>
        </div>
      )}
    </div>

      </div>
      {/* --------------------main navbar------------------------ */}
      <div className="sticky top-0  z-[15]">
        <div className="bg-white px-2 md:px-5  pb-2.5 pt-2.5 border-b border-gray-300 mx-0 lg:mx-6 ">
          <div className=" grid grid-cols-3 md:gap-0">
            <div className="flex items-center gap-1">
              <div className=" lg:hidden">
                <button onClick={toggleDrawerCatagory}>
                  <Icon
                    className="text-light-text text-xl"
                    icon="ri:menu-fill"
                  />
                </button>
              </div>

              {/* ------serachbar center-------- */}
              <NavbarSearch />
            </div>

            <div className=" w-full">
              <Link href={"/"} className="mx-auto ">
                <Image
                  src={"/assets/mainlogo.png"}
                  className="w-[150px] sm:w-[180px] lg:w-[200px]  mx-auto"
                  height={100}
                  width={800}
                  alt="logo"
                />
              </Link>
            </div>

            <div className=" flex items-center justify-end">
              <div className="flex items-center justify-end gap-4 mt-0 lg:mt-3">
                {!token && (
                  <div className="ml-4 hidden lg:block">
                    <label tabIndex={0} className="">
                      <div className="flex items-center">
                        {/* <SlUser size={20} className="text-white font-bold" /> */}
                        <div className="text-light-text text-[14px] flex items-start gap-1 avenir2">
                          <Link className=" duration-150" href={"/auth/login"}>
                            Account
                          </Link>

                        </div>
                      </div>
                    </label>
                  </div>
                )}
                {token && (
                  <div className="dropdown dropdown-end hidden lg:block">
                    <label
                      tabIndex={0}
                      className="btn btn-sm btn-ghost btn-circle avatar bg-primary"
                    >
                      <div className="w-10 rounded-full">
                        <Image
                          src={user?.imageURL || "/assets/user.jpg"}
                          className="rounded-full"
                          height={100}
                          width={100}
                          alt="profile"
                        />
                      </div>
                    </label>

                    <ul
                      tabIndex={0}
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        {token && userRole === "user" && (
                          <Link
                            href={"/user/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}
                        {token && userRole === "admin" && (
                          <Link
                            href={"/admin/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>

                      {token && userRole === "user" && (
                        <li>
                          <Link
                            href={"/user/my-order"}
                            className="justify-between"
                          >
                            My Order
                          </Link>
                        </li>
                      )}

                      {token &&
                        (userRole === "admin" || userRole === "user") ? (
                        <>
                          <li>
                            <span onClick={logout}>Logout</span>
                          </li>
                        </>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2 md:gap-4">
                  <div className="">
                    <label
                      tabIndex={0}
                      className="cursor-pointer "
                      onClick={toggleDrawer}
                    >
                      <div className="indicator">
                        <Icon
                          className="text-2xl "
                          icon="ant-design:shopping-outlined"
                        />
                        {localStorageCartItems.totalItems > 0
                          && <span className="badge badge-xs py-2 text-[10px] indicator-item bg-black text-white border-none ">
                            {localStorageCartItems.totalItems}
                          </span>}

                      </div>
                    </label>
                  </div>
                  <div className="">
                    <label
                      onClick={toggleDrawerWishlist}
                      tabIndex={0}
                      className="cursor-pointer "
                    >
                      <div className="indicator">
                        <Icon className="text-2xl text-black" icon="mage:heart" />
                        {
                          localStorageWishlistItems.totalItems > 0
                          && <span className="badge badge-xs py-2 text-[10px] indicator-item bg-black text-white border-none">
                            {localStorageWishlistItems.totalItems}
                          </span>
                        }

                      </div>
                    </label>
                  </div>
                </div>
                {/* nav drop */}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------3rd menu--------------- */}
        <div className="lg:block hidden border-b border-gray-300 py-[18px] bg-primary mx-0 ">
          {/* ------second bg color write in global.css */}
          <div className=" px-10">
            <ul className="flex items-center justify-between gap-2  px-0 text-[14px] text-light-text w-9/12 mx-auto avenir2">
              <li>
                <Link
                  href="/offer"
                  className="py-5 text-white border-b-2 border-transparent hover:border-white duration-500 "
                >
                  OFFER
                </Link>
              </li>

              <li tabIndex={0} className="group ">
                <a className="py-5 hover:text-white border-b-2 text-white  border-transparent hover:border-white duration-500 cursor-pointer">
                  CATEGORIES
                </a>
                <div className="absolute top-[-700px]  w-[300px] mx-auto group-hover:top-[133px] ">
                  <SiebarMenu catagories={categoryData} />
                </div>
              </li>

              {/* <NaveCategory title={"Art Supplies"} />
              <NaveCategory title={"Journaling"} />
              <NaveCategory title={"Stationery"} />
              <NaveCategory title={"Gift"} /> */}
              <li>
                <Link
                  href="/magazine"
                  className="py-5 text-white border-b-2 border-transparent hover:border-white duration-500 "
                >
                  BLOG
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="py-5 text-white border-b-2 border-transparent hover:border-white duration-500 "
                >
                  CONTACT US
                </Link>
              </li>
              {/* <li>
                      <Link href="/faq" className="py-2">
                        FAQ
                      </Link>
                    </li> */}
            </ul>
          </div>
        </div>
      </div>
      <CartDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        dir={"right"}
        products={localStorageCartItems}
      />
      <WishlilstDrawer
        isOpenWishlist={isOpenWishlist}
        toggleDrawerWishlist={toggleDrawerWishlist}
        dir={"right"}
        products={localStorageWishlistItems}
      />

      {/* shopping bag for dekstop */}

      {localStorageCartItems.totalItems > 0 && (
        <div
          className="toast toast-end toast-middle z-10 cursor-pointer hidden md:block"
          onClick={toggleDrawer}
        >
          <div className="alert p-0 bg-primary">
            <div className="flex flex-col text-xs">
              <div className="text-white font-bold flex flex-col items-center px-5 bg-slate-300  rounded-t-md py-3">
                <BsBagCheck size={25} className="text-primary mb-1" />
                <span className="text-slate-600 text-sm">
                  {localStorageCartItems?.totalItems} Items
                </span>
              </div>
              <p className="text-white font-bold  text-sm pb-2">
                ৳{localStorageCartItems?.cartTotal}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* shopping bag for mobile */}
      {localStorageCartItems.totalItems > 0 && (
        <div
          className="toast toast-end toast-middle z-10 mr-[-20px] cursor-pointer block md:hidden "
          onClick={toggleDrawer}
        >
          <div className="alert p-0 bg-primary">
            <div className="flex flex-col text-xs">
              <div className="text-white font-bold flex flex-col items-center px-3 bg-slate-300  rounded-md py-3">
                <BsBagCheck size={22} className="text-primary mb-1" />
                <span className="text-slate-600 text-sm">
                  {localStorageCartItems?.totalItems} Items
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <CatagoryDrawer
        isOpenCatgory={isOpenCatgory}
        toggleDrawerCatagory={toggleDrawerCatagory}
        dir={"left"}
        products={[]}
      />
    </div>
  );
};

export default Navbar;

// cart drawer
