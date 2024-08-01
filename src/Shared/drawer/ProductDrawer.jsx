import React, { useContext, useEffect } from "react";

import Drawer from "react-modern-drawer";
import { MdAddShoppingCart } from "react-icons/md";

import "react-modern-drawer/dist/index.css";
import CartProductItems from "./CartProductItems";
import LoadingComponets from "../LoadingComponets";
import Link from "next/link";
import CreateContext from "../../Components/CreateContex";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { products } from "../../../lib/helper";
import { useState } from "react";
import SelectProductItem from "./SelectProductItem";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useMediaQuery } from "@react-hook/media-query";

const ProductDrawer = ({
  isOpen,
  toggleDrawer,
  dir,
  setGetProductId,
  getProductId,
}) => {
  const router = useRouter();
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const { user, setQueryFromCategory } = useContext(CreateContext);
  const [visible, setVisible] = useState(15);
  const [mobile, setMobile] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (isSmallScreen) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [isSmallScreen]);

  const handleCheckout = () => {
    // if (products?.items?.length > 0) {
    //   router.push("/checkout");
    //   toggleDrawer();
    // } else if (products?.items?.length < 1) {
    //   router.push("/shop");
    //   setQueryFromCategory("");
    //   toggleDrawer();
    // } else {
    //   toggleDrawer();
    // }
  };

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilterPrice],
    () => products(queryFilterPrice)
  );

  const handleSelectProduct = (product, filterItem) => {
    const isSelected = Boolean(
      getProductId.find((grpStud) => grpStud._id === product._id)
    );
    if (isSelected) {
      setGetProductId(getProductId.filter((item) => item._id !== product._id));
    } else {
      const items = {
        price: product?.variantType
          ? filterItem?.productPrice
          : product.productPrice,
        salePrice: product?.variantType
          ? filterItem?.salePrice
          : product?.salePrice,
        originalPrice: product?.variantType
          ? filterItem?.price
          : product?.price,
        discount: 0,
        _id: product?._id,
        createdAt: new Date().toString(),
        image: product.imageURLs[0],
        parent_category: product?.parent_category,
        quantity: 1,
        productTitle: product?.name,
        delivery: product?.delivery,
        sku: "",
        userSize: filterItem,
        userSelectSize: product?.variant[0]?.size3,
        size: product.size,
        weight:product?.weight,
        variant: product?.variant,
        offer_discount: product?.offer_discount,
        offer_quantity: product?.offer_quantity,
        type: product?.type,
        size: product?.variantType ? filterItem.size : "",
        color: product?.variantType ? filterItem.color : "",
        set: product?.variantType ? filterItem.set : "",
        design: product?.variantType ? filterItem.design : "",
        other: product?.variantType ? filterItem.other : "",
        variantType: product?.variantType,
        attributes: product?.attributes,
        variant: product?.variant,
        itemTotal: product?.variantType
          ? filterItem?.salePrice
          : product?.salePrice,
      };

      setGetProductId((pre) => [...pre, items]);
    }
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    setQueryFilterPrice(`search=${searchValue}`);
  };

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={dir}
        size="100px"
        style={mobile ? { width: "85%" } : { width: "400px" }}
      >
        <div className="bg-primary max-w-[800px] p-3 md:py-4 md:px-7">
          <div className="flex justify-between max-w-[800px]">
            <span className="flex items-center text-white gap-2">
              {/* <MdAddShoppingCart size={22} /> */}
              <span className="text-xl font-bold">All Product</span>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawer}
                className="text-white hover:text-red-500"
              >
                <span>x</span> close
              </button>
            </span>
          </div>
        </div>

        <div className=" bg-white py-2 px-2 w-full">
          <input
            type="text"
            onChange={handelChange}
            placeholder="Search Product...."
            className="input input-bordered  block w-full h-10"
            style={{ outline: "none" }}
            name="search"
          />
        </div>
        {/* ------------------------items------------------- */}

        <div className=" overflow-y-scroll h-[80%]">
          {data?.data?.products.slice(0, visible).map((product) => (
            <SelectProductItem
              key={product?._id}
              product={product}
              handleSelectProduct={handleSelectProduct}
              getProductId={getProductId}
            />
          ))}
          <div className="w-full text-center">
            {data?.data?.products.length > visible && (
              <button
                onClick={showMoreItems}
                className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
              >
                <MdOutlineUnfoldMore size={22} />
                Load More
              </button>
            )}
          </div>
        </div>

        {/* <div
          onClick={() => handleCheckout()}
          className=" bg-primary py-4 px-3 flex w-[90%] mx-4 justify-between fixed bottom-6 md:bottom-3 items-center cursor-pointer hover:font-bold rounded-md duration-100"
        >
          <h1 className="text-white text-sm block">Proceed To Checkout</h1>
          <span className="btn btn-sm text-primary bg-white hover:bg-secondary font-warning ">
            ৳{products?.cartTotal}
          </span>
        </div> */}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
