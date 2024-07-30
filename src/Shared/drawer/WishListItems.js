
import Image from "next/image";
import React from "react";
import { MdDeleteForever } from "react-icons/md";

const WishListItems = ({ product }) => {
  const handleDeleteCartItem = () => {
    updateCartLocalStorage({ product, action: "delete" });
    setAddToCartRefresher(!addToCartRefresher);
  };

  return (
    <div className=" ">
      <div className="flex gap-3 hover:bg-secondary p-3 md:py-4 md:px-7">
        <div className="flex items-center">
          <Image
            src={product?.image}
            alt="product"
            width={60}
            height={60}
            className="rounded-full object-cover bg-white p-1 border-2 border-gray-200"
          />
        </div>
        {/* --------info------------ */}
        <div className="flex items-end gap-4">
          <div>
            <h2 className="text-sm text-slate-900  flex-wrap">
              {product?.productTitle}
            </h2>
            <p className="text-slate-400 text-xs mb-1">
              Item Price ${product.price}
            </p>
            <p className="text-sm font-bold text-slate-900">
              ${product?.itemTotal}
            </p>
          </div>
          <div>
            <span className="flex items-center justify-start border-gray-300 border-2 rounded-md">
              <button
                onClick={handleDecreseProduct}
                className="btn-xs text-3xl flex items-center"
              >
                -
              </button>
              <input
                type={"text"}
                style={{
                  border: "none",
                  outline: "none",
                  background: "none",
                }}
                className="input-square input-sm w-8 font-bold "
                value={product.quantity}
              />
              <button
                onClick={handleIncreaseProduct}
                className="btn-xs text-xl font-bold flex items-center"
              >
                +
              </button>
            </span>
          </div>
        </div>
        <div className="items-end flex ml-auto">
          <button className="" onClick={handleDeleteCartItem}>
            <MdDeleteForever size={25} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListItems;
