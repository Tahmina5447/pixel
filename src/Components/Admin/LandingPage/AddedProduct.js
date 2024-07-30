import React, { useEffect, useState } from "react";
import CheckoutProductItems from "../../CheckoutProductItems/CheckoutProductItems";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  sumOfCartPrice2,
  sumOfSalePrice2,
} from "../../../../lib/commonFunction";
import { handlePostMethod } from "../../../../lib/usePostHooks";

const AddedProduct = ({
  getProductId,
  setGetProductId,
  totalPriceOfCartItem,
  setTotalPriceOfCartItem,
}) => {
  const [originalPriceTotal, setOriginalPriceTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [databaseCartAndPriceTotal, setDatabaseCartAndPriceTotal] = useState({
    cartTotal: 0,
    originalProductPrice: 0,
  });

  // ---------------price setup-----------------------

  const getTotalSalePrice = (products) => {
    let totalSalePrice = 0;
    // Iterate through each product and calculate the total sale price
    products.forEach((product) => {
      totalSalePrice += product.salePrice * product.quantity;
    });

    return totalSalePrice;
  };

  const getTotalproductPrice = (products) => {
    let totalSalePrice = 0;
    // Iterate through each product and calculate the total sale price
    products.forEach((product) => {
      totalSalePrice += product.price * product.quantity;
    });

    return totalSalePrice;
  };

  useEffect(() => {
    setCouponDiscount(0);
    setOriginalPriceTotal(getTotalproductPrice(getProductId));
    setCartTotal(getTotalSalePrice(getProductId));
  }, [getProductId]);

  useEffect(() => {
    if (getProductId) {
      const productIdAndQuantity = getProductId?.map((item) => {
        return { id: item?._id, quantity: item?.quantity };
      });
      const url =
        "http://localhost:5000/api/v1/order/get-total-price";
      handlePostMethod(url, productIdAndQuantity, setTotalPriceOfCartItem);
    }
    if (getProductId.length > 0) {
      const totalOriginal = sumOfSalePrice2(getProductId);
      setOriginalPriceTotal(totalOriginal);
      // its function response product id and q to product sale price total and original price total
      sumOfCartPrice2(getProductId, setDatabaseCartAndPriceTotal);
    } else {
      setOriginalPriceTotal(0);
      setDatabaseCartAndPriceTotal({
        cartTotal: 0,
        originalProductPrice: 0,
      });
    }
    setCouponDiscount(0);
  }, [getProductId]);

  //------------------ end price setup------------------
  const handleDelete = (id) => {
    setGetProductId((prevTotalProduct) =>
      prevTotalProduct.filter((product) => product._id !== id)
    );
  };
  const handleIncreaseProduct = (product) => {
    const update = getProductId.map((pro) => {
      if (pro._id !== product._id) return pro;
      return { ...pro, quantity: pro.quantity + 1 };
    });
    setGetProductId(update);
  };

  const handleDecreseProduct = (product) => {
    const update = getProductId.map((pro) => {
      if (pro._id !== product._id) return pro;
      return { ...pro, quantity: pro.quantity === 1 ? 1 : pro.quantity - 1 };
    });
    setGetProductId(update);
  };
  return (
    <div>
      <div className=" overflow-y-scroll max-h-96">
        {getProductId.length ? (
          getProductId?.map((product) => (
            // row
            <div className="flex gap-2">
              <div className="w-[95%]">
                <div
                  key={product?._id}
                  className=" mb-2 p-2 rounded cursor-pointer hover:bg-accent duration-200 border"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-14 flex flex-col items-center  justify-center gap-1">
                      <Image
                        width={50}
                        height={50}
                        src={product?.image}
                        alt="fdd"
                        className="w-full h-14 object-cover rounded"
                      />
                      <div className="block md:hidden">
                        <p className="text-xs line-through">
                          ৳{product?.price}
                        </p>
                        <p className="text-sm text-orange-600  font-bold ">
                          ৳{product?.salePrice}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h1
                        onClick={() => router.push(`/product/${product?._id}`)}
                        className="font-medium text-sm"
                      >
                        {product?.productTitle?.slice(0, 35)}...
                      </h1>
                      <div className="flex justify-betweens gap-1 items-end md:items-center">
                        <div className="flex flex-col md:flex-row md:justify-end items-center gap-2 ">
                          <div className="hidden md:block">
                            <p className="text-xs line-through">
                              ৳{product?.price}
                            </p>
                            <p className="text-xs  font-bold ">
                              ৳{product?.salePrice}
                            </p>
                          </div>
                          <div className="flex items-center justify-start border-gray-300 border-2 rounded-md">
                            <label
                              onClick={() => handleDecreseProduct(product)}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Tooltip anchorSelect="#delete_product">Delete</Tooltip>
              <div className="flex items-center justify-center w-[40px] max-w-[40px]">
                <span
                  onClick={() => handleDelete(product?._id)}
                  id="delete_product"
                  className="cursor-pointer border rounded-md  p-2 bg-red-100 "
                >
                  <Icon
                    className="text-red-600 text-lg"
                    icon="material-symbols:delete-outline"
                  />
                </span>
              </div>
            </div>
          ))
        ) : (
          <h2 className=" text-center text-xl font-bold my-10">
            Please select a product!
          </h2>
        )}

        <div className="my-8">
          {totalPriceOfCartItem && (
            <>
              <p>
                <span className="text-lg font-bold">Total Package Price:</span>
                <span className=" text-gray-500"> ৳{totalPriceOfCartItem}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddedProduct;
