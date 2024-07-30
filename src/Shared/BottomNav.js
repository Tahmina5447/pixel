import React, { useContext, useState } from "react";
import CreateContext from "../Components/CreateContex";
import { BiUser } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import CatagoryDrawer from "./drawer/CatagoryDrawer";
import UserBottomDrawer from "./drawer/UserBottomDrawer";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthUser from "../../lib/AuthUser";
import { useUserData } from "../hooks/useMyShopData";
import Image from "next/image";
import { Icon } from "@iconify/react";

const BottomNav = () => {
  const {
    isOpen,
    setIsOpen,
    localStorageCartItems,
    isOpenWishlist,
    setIsOpenWishlist,
    localStorageWishlistItems,
    user,
  } = useContext(CreateContext);

  const [isOpenCatgory, setIsOpenCatgory] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  const toggleDrawerCatagory = () => {
    setIsOpenCatgory(!isOpenCatgory);
  };
  const toggleDrawerUser = () => {
    setIsOpenUser(!isOpenUser);
  };
  const toggleDrawerWishlist = () => {
    setIsOpenWishlist(!isOpenWishlist);
  };
  return (
    <div className="mid-container lg:hidden block">
      <div className="btm-nav bg-white border border-t z-50">
      <div className="bg-white">
          <Link
            href={'/shop'}
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
            <Icon className="text-primary text-2xl" icon="mdi:shopping-outline" />
            </div>
          </Link>
        </div>

        <div className=" bg-white text-primary">
          <label
            onClick={toggleDrawerWishlist}
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <AiOutlineHeart className="text-primary" size={28} />
              <span className="badge badge-sm indicator-item bg-primary text-white border-0 outline-0">
                {localStorageWishlistItems.totalItems
                  ? localStorageWishlistItems.totalItems
                  : 0}
              </span>
            </div>
          </label>
        </div>

        <Link href={"/"} className="bg-white rounded-full">
          <label tabIndex={0} className="btn btn-ghost btn-circle bg-primary">
            <div className="indicator">
              <AiOutlineHome size={30} color="#fff" />
            </div>
          </label>
        </Link>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-white text-primary "
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-primary text-white border-0 outline-0">
                {localStorageCartItems.totalItems
                  ? localStorageCartItems.totalItems
                  : 0}
              </span>
            </div>
          </label>
        </div>

        <div className="bg-white ">
          {user?.role === "admin" && (
            <Link
              href={"/admin/dashboard"}
              className="btn btn-ghost btn-circle"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={user?.imageURL || "/assets/user.jpg"}
                  className="rounded-full"
                  height={50}
                  width={50}
                  alt="profile"
                />
              </div>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/user/dashboard"} className="btn btn-ghost btn-circle">
              <div className="w-10 rounded-full">
                <Image 
                  src={user?.imageURL || "/assets/user.jpg"}
                  className="rounded-full"
                  height={50}
                  width={50}
                  alt="profile"
                />
              </div>
            </Link>
          )}
          {!user?.email && (
            <Link href={"/auth/login"} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <BiUser size={30} className="text-primary" />
              </div>
            </Link>
          )}
        </div>
      </div>
      <CatagoryDrawer
        isOpenCatgory={isOpenCatgory}
        toggleDrawerCatagory={toggleDrawerCatagory}
        dir={"left"}
        products={[]}
      />
    </div>
  );
};

export default BottomNav;
