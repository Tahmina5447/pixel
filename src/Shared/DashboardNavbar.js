
import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import AuthUser from "../../lib/AuthUser";
import { useMyShopData } from "../hooks/useMyShopData";
import Image from "next/image";

const DashboardNavbar = () => {
  const { isLoading, data: shopData, error } = useMyShopData();
  const { userInfo, logout } = AuthUser();

  /*  const { data, isLoading, refetch } = useCustomQuery(
   "users-profile",
   `user/${userInfo?._id}`
 );
   */
  return (
    <div className="navbar bg-base-100 border-slate-200 border-b mx-auto px-2 md:px-8 ">
      <div className="flex-1 ">
        <div className=" block lg:hidden">
          {userInfo?.role === "admin" && (
            <label
              htmlFor="dashboard-drawer-toggle"
              className="btn btn-primary btn-md btn-square drawer-button mr-5"
            >
              <AiOutlineMenu size={18} className="text-white " />
            </label>
          )}
          {userInfo?.role === "user" && (
            <label
              htmlFor="my-drawer-user"
              className="btn btn-primary btn-md btn-square drawer-button mr-5"
            >
              <AiOutlineMenu size={18} className="text-white " />
            </label>
          )}
        </div>
        <Link
          href={"/"}
          className="font-extrabold  text-md md:text-2xl uppercase hover:text-black text-primary duration-150 cursor-pointer"
        >
          {shopData?.data?.shopName}
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={userInfo.imageURL || "/assets/user.jpg"}
                width={100}
                height={100}
                className="w-10"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {userInfo.role === "admin" && (
              <>
                <li>
                  <Link
                    href={`/admin/customers/update-user/${userInfo?._id}`}
                    className="justify-between"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/setting/my-shop"}>Settings</Link>
                </li>
              </>
            )}
            {userInfo.role === "user" && (
              <>
                <li>
                  <Link href={`/user/my-profile`} className="justify-between">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link href={`/user/my-order`} className="justify-between">
                    My Order
                  </Link>
                </li>
                <li>
                  <Link href={"/user/setting"}>Settings</Link>
                </li>
              </>
            )}
            <li>
              <span onClick={() => logout()}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
