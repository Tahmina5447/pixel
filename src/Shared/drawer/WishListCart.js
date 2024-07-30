import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Drawer from "react-modern-drawer";
import WishListItems from "./WishListItems";

const WishListCart = ({ isOpenWish, toggleDrawerWish, dir, items }) => {
  return (
    <>
      <Drawer
        open={isOpenWish}
        onClose={toggleDrawerWish}
        direction={dir}
        className="user-drawer  "
        style={{ width: "400px" }}
      >
        <div className="bg-primary p-3 md:py-4 md:px-7">
          <div className="flex justify-between">
            <span className="flex items-center text-white gap-2">
              <MdAddShoppingCart size={30} />
              <span className="text-2xl font-bold ">User Login</span>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawerWish}
                className="text-red-500 btn btn-sm bg-white btn-circle text-xl font-bold"
              >
                <span className="">x</span>
              </button>
            </span>
          </div>
          {/* -------------------------another content here-------------------- */}
          {/* ------------------------items------------------- */}

          <div className=" overflow-y-scroll h-[85%]">
            {items?.items?.map((item) => (
              <WishListItems key={item._id} product={item} />
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default WishListCart;
