import React, { useContext, useEffect, useState } from "react";

import Drawer from "react-modern-drawer";
import { MdAddShoppingCart } from "react-icons/md";
import "react-modern-drawer/dist/index.css";
import CartProductItems from "./CartProductItems";
import CreateContext from "../../Components/CreateContex";
import { useRouter } from "next/router";
import { useMediaQuery } from "@react-hook/media-query";
import { Icon } from "@iconify/react/dist/iconify.js";

const CartDrawer = ({ isOpen, toggleDrawer, dir, products }) => {
  const router = useRouter();

  const { user, setQueryFromCategory } = useContext(CreateContext);

  const [mobile, setMobile] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (isSmallScreen) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [isSmallScreen]);

  const transformedItems = products?.items?.map((item) => ({
    item_id: item._id,
    item_name: item.productTitle,
    price: item.salePrice,
    quantity: item.quantity,
  }));

  // console.log("==============", transformedItems)
  const handleCheckout = () => {
    if (products?.items?.length > 0) {
      router.push("/checkout");
      // window.gtag("event", "begin_checkout", {
      //   currency: "BDT",
      //   value: products?.cartTotal,
      //   items:transformedItems
      // });
      toggleDrawer();
    } else if (products?.items?.length < 1) {
      router.push("/shop");
      setQueryFromCategory("");
      toggleDrawer();
    } else {
      toggleDrawer();
    }
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={dir}
        // className="cart-drawer "
        style={mobile ? { width: "75%" } : { width: "400px" }}
      >
        <div className="bg-primary overflow-y-auto p-3 md:py-4 md:px-7">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-white gap-2">
              <Icon
                className="text-2xl"
                icon="ant-design:shopping-outlined"
              />
              <span className="text-xl font-bold">Cart</span>
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

        <div className=" overflow-y-scroll h-[75%]">
          {products?.items?.map((product) => (
            <CartProductItems key={product?._id} product={product} />
          ))}
        </div>

        <div
          onClick={() => handleCheckout()}
          className=" bg-primary py-4 px-3 flex w-[90%] mx-4 justify-between fixed bottom-6 md:bottom-3 items-center cursor-pointer hover:font-bold rounded-md duration-100"
        >
          <h1 className="text-white text-sm block">Proceed To Checkout</h1>
          <span className="btn btn-sm text-primary bg-white hover:bg-secondary font-warning ">
            ৳{products?.cartTotal}
          </span>
        </div>
      </Drawer>
    </>
  );
};

export default CartDrawer;
