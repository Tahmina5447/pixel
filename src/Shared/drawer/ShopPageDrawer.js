import React, { useContext } from "react";

import Drawer from "react-modern-drawer";
import { MdAddShoppingCart } from "react-icons/md";

import CreateContext from "../../Components/CreateContex";
import { useRouter } from "next/router";
import { AiFillFilter } from "react-icons/ai";
import { Icon } from "@iconify/react/dist/iconify.js";

const ShopPageDrawer = ({
  isOpen,
  toggleDrawer,
  dir,
  products,
  leftSideBar,
}) => {
  const router = useRouter();

  const { user } = useContext(CreateContext);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={dir}
        className=" w-[320px] md:w-[40%] pb-8 "
      >
        <div className="bg-primary p-3 md:py-4 md:px-7 ">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-white gap-2">
              <span className="text-xl font-bold">Filter Shop</span>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawer}
                className="text-white hover:text-red-500"
              >
                <span><Icon className="text-2xl" icon="charm:cross" /></span>
              </button>
            </span>
          </div>
        </div>
        {/* ------------------------items------------------- */}

        <div className="overflow-scroll pb-8">{leftSideBar}</div>
      </Drawer>
    </>
  );
};

export default ShopPageDrawer;
