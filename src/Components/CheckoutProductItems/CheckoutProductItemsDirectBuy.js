import React, { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
const CheckoutProductItemsDirectBuy = ({
  product,
  handleSaveSizeInLocal,
  qyt,
  setQyt,
  setIsOpenSizeAndColor,
  setProductItem,
  inputSize,
  mewColor,
  newSize,
  newSet,
  newOther,
  newDesign,

  cartTotal,
}) => {
  const router = useRouter();
  const handleSizeAndColorWithModal = () => {
    setProductItem(product);
    setIsOpenSizeAndColor(true);
  };

  return (
    <div
      key={product?._id}
      className=" mb-2 p-2 rounded cursor-pointer hover:bg-accent duration-200 border"
    >
      <div className="flex gap-3 items-center">
        <div className="w-14 flex flex-col items-center justify-center gap-1">
          <Image
            width={50}
            height={50}
            src={product?.imageURLs[0]}
            alt="fdd"
            className="w-full h-14 object-cover rounded"
          />
          <div className="block md:hidden">
            <p className="text-xs line-through">
              ৳
              {product?.variantType
                ? inputSize?.productPrice
                : product?.productPrice}
            </p>
            <p className="text-xs  font-bold ">
              ৳
              {product?.variantType
                ? Number(inputSize?.offer_quantity) <= product?.quantity
                  ? inputSize?.salePrice - Number(inputSize?.offer_discount)
                  : product?.salePrice
                : product?.salePrice}
            </p>
            {/* <h2>৳ {cartTotal}</h2> */}
          </div>
          {}
        </div>
        <div>
          <div className="hidden md:block">
            <p className="text-xs line-through">
              ৳
              {product?.variantType
                ? inputSize?.productPrice
                : product?.productPrice}
            </p>
            <p className="text-xs  font-bold ">
              ৳
              {product?.variantType
                ? Number(inputSize?.offer_quantity) <= qyt
                  ? inputSize?.salePrice - Number(inputSize?.offer_discount)
                  : inputSize?.salePrice
                : Number(product?.offer_quantity) <= qyt
                ? product?.salePrice - Number(product?.offer_discount)
                : product?.salePrice}
            </p>
            {/* <h2>৳ {cartTotal}</h2> */}
          </div>
        </div>
        <div>
          <h1
            onClick={() => router.push(`/product/${product?.path}`)}
            className="font-medium text-sm"
          >
            {product?.name?.slice(0, 35)}...
          </h1>
          <div className="flex justify-betweens gap-2 items-end md:items-center">
            <div className="flex flex-col md:flex-row md:justify-end items-center gap-3 ">
              <div className="flex items-center justify-start border-gray-300 border-2 rounded-md">
                <label
                  onClick={() => {
                    if (qyt < 2) {
                      return setQyt(1);
                    } else {
                      setQyt(--qyt);
                    }
                  }}
                  className="btn-xs text-3xl flex items-center"
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
                  value={qyt}
                  disabled
                />
                <label
                  onClick={() => setQyt(++qyt)}
                  className="btn-xs text-xl font-bold flex items-center"
                >
                  +
                </label>
              </div>
            </div>
            {mewColor && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Color:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-[#000] text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">{mewColor}</span>
                </div>
              </div>
            )}

            {newSize && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Size:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center min-w-[20px] animate-bounce justify-center rounded-md font-medium bg-[#000] text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block ">{newSize}</span>
                </div>
              </div>
            )}

            {newSet && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Set:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-[#000] text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">{newSet}</span>
                </div>
              </div>
            )}

            {newDesign && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Design:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-[#000] text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">{newDesign}</span>
                </div>
              </div>
            )}
            {newOther && (
              <div className="block md:flex  items-center">
                <h2 className="p-2 font-bold text-[14px]">Other:</h2>
                <div
                  onClick={handleSizeAndColorWithModal}
                  className={`mx-1 border items-center animate-bounce justify-center rounded-md font-medium bg-[#000] text-white cursor-pointer flex gap-2 p-1 text-xs `}
                >
                  <span className="text-xs text-center block">{newOther}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductItemsDirectBuy;
