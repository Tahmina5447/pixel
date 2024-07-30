import React from "react";
import AuthUser from "../../../../lib/AuthUser";
import { useCustomQuery } from "../../../hooks/useMyShopData";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { FaPlusSquare, FaUncharted, FaUserCircle } from "react-icons/fa";
import { TbBrandAbstract } from "react-icons/tb";
import {
  MdAddPhotoAlternate,
  MdDashboardCustomize,
  MdOutlineLocalShipping,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { RiListUnordered } from "react-icons/ri";
import { BsGift, BsShop } from "react-icons/bs";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAccountBook, AiOutlineDollar } from "react-icons/ai";
import Image from "next/image";

const AdminDashboardSidebar = () => {
  const { logout, userInfo } = AuthUser();

  const { data, isLoading, refetch } = useCustomQuery(
    "users-profile",
    `user/${userInfo?._id}`
  );
  const router = useRouter();

  const isActive = (href) => {
    return router.pathname === href;
  };
  const activeStyle = {
    // your active style

    color: "#ffffff",
    background: "#4c2745",
  };

  let hover = " text-gray-500 hover:bg-gray-100 hover:text-gray-700";

  return (
    <div className="flex h-screen flex-col  border-r bg-white w-[250px] md:w-full">
      <div className="sticky inset-x-0 top-0 py-3 bg-white border-b border-gray-100">
        <Link
          href={`/admin/customers/update-user/${data?.data?._id}`}
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <Image
            alt="profile image"
            src={data?.data?.imageURL || "/assets/user.jpg"}
            width={100}
            height={100}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-extrabold uppercase">
                {data?.data?.fullName}
              </strong>

              <span className="text-gray-500"> {data?.data?.email} </span>
            </p>
          </div>
        </Link>
      </div>
      <div className="px-4 py-6">
        <nav
          aria-label="Main Nav"
          className=" flex flex-col space-y-1 overflow-y-auto lg:w-56 w-56 bg-white"
        >
          <Link
            href="/admin/dashboard"
            style={isActive("/admin/dashboard") ? activeStyle : undefined}
            className={
              "flex items-center gap-2 rounded-lg  px-4 py-2  " + hover
            }
          >
            <MdDashboardCustomize size={20} />

            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          {/* acount section */}
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/account/balance")
                  ? activeStyle
                  : undefined || isActive("/admin/account/balance/category")
                    ? activeStyle
                    : undefined || isActive("/admin/account/balance/expense-calculate")
                      ? activeStyle
                      : undefined || isActive("/admin/account/balance/all-expense")
                        ? activeStyle
                        : undefined || isActive("/admin/account/balance/all-return")
                          ? activeStyle
                          : undefined || isActive("/admin/account/balance/add-expense")
                            ? activeStyle
                            : undefined || isActive("/admin/account/balance/add-income")
                              ? activeStyle
                              : undefined || isActive("/admin/account/balance/all-income")
                                ? activeStyle
                                : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <AiOutlineAccountBook size={20} />

                <span className="text-sm font-medium"> Accounts </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 z-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/account/balance"
                style={
                  isActive("/admin/account/balance") ? activeStyle : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <AiOutlineDollar size={20} />

                <span className="text-sm font-medium"> Manage Balance </span>
              </Link>
              <Link
                href="/admin/account/balance/category"
                style={
                  isActive("/admin/account/balance/category")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon icon="tdesign:money" />

                <span className="text-sm font-medium">Ex-In Category</span>
              </Link>
              <Link
                href="/admin/account/balance/add-expense"
                style={
                  isActive("/admin/account/balance/add-expense")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium">Add Expense</span>
              </Link>
              <Link
                href="/admin/account/balance/all-expense"
                style={
                  isActive("/admin/account/balance/all-expense")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon icon="fluent-mdl2:sell" />

                <span className="text-sm font-medium">All Expense</span>
              </Link>
              <Link
                href="/admin/account/balance/add-income"
                style={
                  isActive("/admin/account/balance/add-income")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium">Add Income</span>
              </Link>
              <Link
                href="/admin/account/balance/all-income"
                style={
                  isActive("/admin/account/balance/all-income")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon icon="game-icons:profit" />

                <span className="text-sm font-medium">All Income</span>
              </Link>
              <Link
                href="/admin/account/balance/all-return"
                style={
                  isActive("/admin/account/balance/all-return")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon icon="fluent-mdl2:return-key" />

                <span className="text-sm font-medium">All Return</span>
              </Link>
              <Link
                href="/admin/account/balance/expense-calculate"
                style={
                  isActive("/admin/account/balance/expense-calculate")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon icon="majesticons:calculator-line" />

                <span className="text-sm font-medium">Expense Calculate</span>
              </Link>
            </nav>
          </details>
          <Link
            href="/admin/review"
            style={isActive("/admin/review") ? activeStyle : undefined}
            className={
              `${
                userInfo.role === "staff" && "hidden"
              } flex items-center gap-2 rounded-lg  px-4 py-2   ` + hover
            }
          >
            <Icon
              className="text-2xl"
              icon="material-symbols:rate-review-outline"
            />

            <span className="text-sm font-medium">All Review </span>
          </Link>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/products/add-product")
                  ? activeStyle
                  : undefined || isActive("/admin/products")
                    ? activeStyle
                    : undefined || isActive("/admin/products/update-product")
                      ? activeStyle
                      : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <FaUncharted size={20} />

                <span className="text-sm font-medium"> Products </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/products/add-product"
                style={
                  isActive("/admin/products/add-product")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium"> Add Product </span>
              </Link>
              <Link
                href="/admin/products"
                style={isActive("/admin/products") ? activeStyle : undefined}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <MdOutlineProductionQuantityLimits size={20} />

                <span className="text-sm font-medium"> All Products </span>
              </Link>
            </nav>
          </details>
          {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/landing-page/add-page")
                  ? activeStyle
                  : undefined || isActive("/admin/landing-page")
                    ? activeStyle
                    : undefined || isActive("/admin/landing-page/update-page")
                      ? activeStyle
                      : undefined || isActive("/admin/landing-page/view-page")
                        ? activeStyle
                        : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Icon className="text-lg" icon="gridicons:create" />

                <span className="text-sm font-medium"> Landing Page </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/landing-page"
                style={
                  isActive("/admin/landing-page") ? activeStyle : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon className="text-lg" icon="iconoir:page" />

                <span className="text-sm font-medium"> All Page </span>
              </Link>
              <Link
                href="/admin/landing-page/add-page"
                style={
                  isActive("/admin/landing-page/add-page")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium"> Add Page </span>
              </Link>
            </nav>
          </details> */}

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/magazine/add-magazine")
                  ? activeStyle
                  : undefined || isActive("/admin/magazine")
                    ? activeStyle
                    : undefined || isActive("/admin/magazine/update-magazine")
                      ? activeStyle
                      : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Icon className="" icon="fluent-mdl2:blog"/>
                <span className="text-sm font-medium"> Blog </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/magazine"
                style={
                  isActive("/admin/magazine") ? activeStyle : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon className="text-lg" icon="iconoir:page" />

                <span className="text-sm font-medium"> All Blog </span>
              </Link>
              <Link
                href="/admin/magazine/add-magazine"
                style={
                  isActive("/admin/magazine/add-magazine")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium"> Add Blog </span>
              </Link>
            </nav>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/notice/add-notice")
                  ? activeStyle
                  : undefined || isActive("/admin/notice")
                    ? activeStyle
                    : undefined || isActive("/admin/notice/update-notice")
                      ? activeStyle
                      : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Icon className="text-lg" icon="iconamoon:notification" />
                <span className="text-sm font-medium"> Notice </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/notice"
                style={
                  isActive("/admin/notice") ? activeStyle : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon className="text-lg" icon="iconoir:page" />

                <span className="text-sm font-medium"> All Notice </span>
              </Link>
              <Link
                href="/admin/notice/add-notice"
                style={
                  isActive("/admin/notice/add-notice")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium"> Add Notice </span>
              </Link>
            </nav>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/category/add-category")
                  ? activeStyle
                  : undefined || isActive("/admin/category")
                    ? activeStyle
                    : undefined || isActive("/admin/brand/brand-setting")
                      ? activeStyle
                      : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <CgMenuGridO size={20} />

                <span className="text-sm font-medium"> Category </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/category/add-category"
                style={
                  isActive("/admin/category/add-category")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium"> Add Category </span>
              </Link>
              <Link
                href="/admin/brand/brand-setting"
                style={
                  isActive("/admin/brand/brand-setting")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <TbBrandAbstract size={20} />

                <span className="text-sm font-medium"> Brand Setting </span>
              </Link>
              <Link
                href="/admin/category"
                style={isActive("/admin/category") ? activeStyle : undefined}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <BiCategoryAlt size={20} />

                <span className="text-sm font-medium"> All Category </span>
              </Link>
            </nav>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/customers/add-user")
                  ? activeStyle
                  : undefined || isActive("/admin/customers")
                    ? activeStyle
                    : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <FiUsers size={20} />

                <span className="text-sm font-medium"> Customers </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/customers/add-user"
                style={
                  isActive("/admin/customers/add-user")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaPlusSquare size={20} />

                <span className="text-sm font-medium"> Add New User </span>
              </Link>
              <Link
                href="/admin/customers"
                style={isActive("/admin/customers") ? activeStyle : undefined}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiUsers size={20} />

                <span className="text-sm font-medium"> All Customer </span>
              </Link>
            </nav>
          </details>
          {/* -----------------------for create custom order------------------------- */}
          <Link
            href="/admin/custom_order"
            style={isActive("/admin/custom_order") ? activeStyle : undefined}
            className={"flex items-center gap-2 rounded-lg  px-4 py-2 " + hover}
          >
            <Icon icon="material-symbols:draft-orders" />

            <span className="text-sm font-medium"> Custom Order </span>
          </Link>

          <Link
            href="/admin/orders"
            style={isActive("/admin/orders") ? activeStyle : undefined}
            className={"flex items-center gap-2 rounded-lg  px-4 py-2 " + hover}
          >
            <RiListUnordered size={20} />

            <span className="text-sm font-medium"> Orders </span>
          </Link>
          <Link
            href="/admin/coupons"
            style={isActive("/admin/coupons") ? activeStyle : undefined}
            className={"flex items-center gap-2 rounded-lg  px-4 py-2 " + hover}
          >
            <BsGift size={19} />

            <span className="text-sm font-medium"> Coupons </span>
          </Link>
          <Link
            href="/admin/delivery"
            style={isActive("/admin/delivery") ? activeStyle : undefined}
            className={"flex items-center gap-2 rounded-lg  px-4 py-2 " + hover}
          >
            <MdOutlineLocalShipping size={20} className="" />

            <span className="text-sm font-medium"> Shipping Setting </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              style={
                isActive("/admin/setting")
                  ? activeStyle
                  : undefined || isActive("/admin/setting/my-shop")
                    ? activeStyle
                    : undefined || isActive("/admin/setting/banner-setting")
                      ? activeStyle
                      : undefined || isActive("/admin/setting/site-api-setting")
                        ? activeStyle
                        : undefined
              }
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <SlSettings size={20} />

                <span className="text-sm font-medium"> Setting </span>
              </div>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
              <Link
                href="/admin/setting/my-shop"
                style={
                  isActive("/admin/setting/my-shop") ? activeStyle : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <BsShop size={20} />

                <span className="text-sm font-medium"> My Shop</span>
              </Link>
              <Link
                href="/admin/setting/banner-setting"
                style={
                  isActive("/admin/setting/banner-setting")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <MdAddPhotoAlternate size={20} />

                <span className="text-sm font-medium">Banner Setting</span>
              </Link>

              <Link
                href="/admin/setting/site-api-setting"
                style={
                  isActive("/admin/setting/site-api-setting")
                    ? activeStyle
                    : undefined
                }
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <Icon className="text-lg" icon="icon-park-outline:api" />

                <span className="text-sm font-medium">Api Setting</span>
              </Link>
            </nav>
          </details>

          <span
            onClick={() => logout()}
            className={"flex items-center gap-2 rounded-lg  px-4 py-2 " + hover}
          >
            <FiLogOut size={20} />

            <span className="text-sm font-medium"> Log Out </span>
          </span>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboardSidebar;
