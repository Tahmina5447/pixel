
import Image from "next/image";
import React from "react";

const DiscountProductItem = ({ product }) => {
  return (
    <div className="bg-white rounded-b-md shadow cursor-pointer hover:shadow-lg duration-100">
      <div className="w-full h-[180px]">
        {/* <Image src={product?.imageURLs
                } alt="" className="w-full h-full object-cover " /> */}
        <Image
          src={product?.imageURLs[0]}
          alt="product image"
          width={300}
          height={180}
          className="rounded-t-md object-cover h-full"
        />
      </div>
      <div className="p-4">
        <h1 className=" font-semibold">{product?.name}</h1>
        <p className="text-neutral text-xs">{product?.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <p className="text-lg text-warning font-semibold">
              ${product?.price}
            </p>
            <p className="text-xs text-neutral line-through ml-2">
              ${product?.price}
            </p>
          </div>
          {/* <div className="flex items-center">
                                <button className="bg-primary text-white px-4 py-2 rounded-md">Add to cart</button>
                            </div> */}
        </div>
      </div>
    </div>
  );
};

export default DiscountProductItem;
