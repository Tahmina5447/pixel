import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { RiListUnordered } from "react-icons/ri";
import { BsGift } from "react-icons/bs";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import Drawer from "react-modern-drawer";
import Link from "next/link";

const UserBottomDrawer = ({ isOpenUser, toggleDrawerUser, dir, items }) => {
  return (
    <>
      <Drawer
        open={isOpenUser}
        onClose={toggleDrawerUser}
        direction={dir}
        className="user-drawer  "
        style={{ width: "400px" }}
      >
        <div className="">
          <div className="flex justify-between bg-primary p-3 md:py-4 md:px-7">
            <span className="flex items-center text-white gap-2">
              <FaUserCircle size={30} />
              <h1 className="sm:text-2xl text-xl font-bold ">Imran Hossen</h1>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawerUser}
                className="text-red-500 btn btn-sm bg-white hover:bg-error hover:text-white btn-circle text-xl font-bold duration-300"
              >
                <span className="">X</span>
              </button>
            </span>
          </div>
          {/* -------------------------another content here-------------------- */}

          <div className="bg-accent h-[100vh]">
            <Link href={'admin/dashboard'} className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <TbLayoutDashboard size={23} />
              </div>
              <div>
                <p className="font-semibold">Dashboard</p>
              </div>
            </Link>
            
            <Link href={'admin/products'} className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <MdOutlineProductionQuantityLimits size={23} />
              </div>
              <div>
                <p className="font-semibold">Products</p>
              </div>
            </Link>

            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <BiCategoryAlt size={23} />
              </div>
              <div>
                <p className="font-semibold">Category</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <FiUsers size={23} />
              </div>
              <div>
                <p className="font-semibold">Customers</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <RiListUnordered size={23} />
              </div>
              <div>
                <p className="font-semibold">Orders</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <BsGift size={20} />
              </div>
              <div>
                <p className="font-semibold">Coupons</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <AiOutlineUserSwitch size={23} />
              </div>
              <div>
                <p className="font-semibold">Our Staff</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <MdManageAccounts size={23} />
              </div>
              <div>
                <p className="font-semibold">My Accounts</p>
              </div>
            </div> 
            <div className="flex justify-start items-center gap-3 hover:bg-secondary p-3 md:py-4 md:px-7 px-4 duration-200 cursor-pointer">
              <div>
                <SlSettings size={21} />
              </div>
              <div>
                <p className="font-semibold">Setting</p>
              </div>
            </div>

          </div>
        </div>
      </Drawer>
    </>
  );
};

export default UserBottomDrawer;
