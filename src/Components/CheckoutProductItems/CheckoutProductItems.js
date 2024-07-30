import React, { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
const CheckoutProductItems = ({
  product,
  handleDecreseProduct,
  handleIncreaseProduct,
  setIsOpenSizeAndColor,
  setProductItem,
}) => {
  const router = useRouter();
  const handleSizeAndColorWithModal = () => {
    setProductItem(product);
    setIsOpenSizeAndColor(true);
  };

  const subtotal =
    Number(product?.offer_quantity) <= product?.quantity
      ? product?.salePrice * product?.quantity -
        Number(product?.offer_discount) * product?.quantity
      : product?.salePrice * product?.quantity;

  return (
    <div
      key={product?._id}
      className=" mb-2 p-2 rounded cursor-pointer hover:bg-accent duration-200 border"
    >
      <div className="flex gap-3 items-center">
        <div className="w-16 flex flex-col items-center  justify-center gap-1">
          <Image
            width={60}
            height={60}
            src={product?.image}
            alt="fdd"
            className="w-full h-16 object-cover rounded"
          />
          <div className="block md:hidden">
            <p className="text-xs line-through">৳{product?.price}</p>
            <p className="text-sm text-orange-600  font-bold ">
              ৳
              {product?.variantType
                ? Number(product?.userSize?.offer_quantity) <= product?.quantity
                  ? product?.salePrice -
                    Number(product?.userSize?.offer_discount)
                  : product?.salePrice
                : Number(product?.offer_quantity) <= product?.quantity
                ? product?.salePrice - Number(product?.offer_discount)
                : product?.salePrice}
            </p>
            {/* <h2 className=" text-[15px]">৳ {subtotal}</h2> */}
          </div>
        </div>
        <div>
          <div className="hidden md:block">
            <p className="text-xs line-through">৳{product?.price}</p>
            <p className="text-sm   font-bold ">
              ৳
              {product?.variantType
                ? Number(product?.userSize?.offer_quantity) <= product?.quantity
                  ? product?.salePrice -
                    Number(product?.userSize?.offer_discount)
                  : product?.salePrice
                : Number(product?.offer_quantity) <= product?.quantity
                ? product?.salePrice - Number(product?.offer_discount)
                : product?.salePrice}
            </p>
            {/* <h2 className=" text-[15px]">৳ {subtotal}</h2> */}
          </div>
        </div>
        <div>
          <h1
            onClick={() => router.push(`/product/${product?.path}`)}
            className="font-medium text-sm"
          >
            {product?.productTitle?.slice(0, 35)}...
          </h1>
          <div className="flex justify-betweens gap-1 items-end md:items-center">
            <div className="flex flex-col md:flex-row md:justify-end items-center gap-2 ">
              <div className="flex items-center justify-start border-gray-300 border-2 rounded-md">
                <label
                  onClick={() => product?.quantity > 1 ?  handleDecreseProduct(product) : ()=>{}}
                  className=" cursor-pointer btn-xs text-3xl flex items-center"
                >
                  -
                </label>
                <input
                  type={"text"}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "none",
                  }}
                  className="input-square input-sm w-10 text-center font-bold "
                  value={product?.quantity}
                  disabled
                />
                <label
                  onClick={() => handleIncreaseProduct(product)}
                  className=" cursor-pointer btn-xs text-xl font-bold flex items-center"
                >
                  +
                </label>
              </div>
            </div>

            {product?.color?.length >= 1 && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Color:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-primary text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">
                    {product?.color}
                  </span>
                </div>
              </div>
            )}

            {product?.size?.length >= 1 && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Size:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center min-w-[20px] animate-bounce justify-center rounded-md font-medium bg-primary text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block ">
                    {product?.size}
                  </span>
                </div>
              </div>
            )}

            {product?.set?.length >= 1 && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Set:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-primary text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">
                    {product?.set}
                  </span>
                </div>
              </div>
            )}

            {product?.design?.length >= 1 && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Design:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-primary text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">
                    {product?.design}
                  </span>
                </div>
              </div>
            )}
            {product?.other?.length >= 1 && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Other:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-primary text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">
                    {product?.other}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductItems;
