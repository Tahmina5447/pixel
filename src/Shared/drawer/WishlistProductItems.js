import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

import CreateContext from "../../Components/CreateContex";
import updateWishlistLocalStorage from "../../../lib/updateWishlistLocalStorage";
import setCartInLocalStorage from "../../../lib/setCartInLocalStorage";
import AlreadyProductHave from "../../Components/Home/PopularProducts/AlreadyProductHave";
import { useRouter } from "next/router";
import Image from "next/image";

const WishlistProductItems = ({ product }) => {
  const { addToCartRefresher, setAddToCartRefresher } =
    useContext(CreateContext);
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);
  const router = useRouter();

  const handleDeleteCartItem = () => {
    updateWishlistLocalStorage({ product, action: "delete" });
    setAddToCartRefresher(!addToCartRefresher);
  };

  //   transfar to add to cart

  const handleSetLocalStorage = () => {
    let newProduct = { ...product };
    newProduct.imageURLs = [product.image];
    newProduct.name = product.productTitle;
    newProduct.productPrice = product.price;

    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorage(newProduct);

    setIsAlreadyAvailable(false);

    if (localStorageMessage) {
      setIsAlreadyAvailable("Already Added In Cart");
    }
  };

  const productView = () => {
    router.push(`/product/${product?.path}`)

    window.gtag("event", "view_item", {
      currency: "BDT",
      value: product?.salePrice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.name,
          price: product?.salePrice,
          quantity: 1
        }
      ]
    });
  }

  const addToCartHandle = () => {
    window.gtag('event', 'add_to_cart', {
      currency: 'BDT',
      value: product?.salePrice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.name,
          price: product?.salePrice,
          quantity: 1
        }
      ]
    });
  }


  return (
    <div className=" ">
      <div className="flex gap-3 bg-primary bg-opacity-25 border border-y-base-300 p-3 md:py-4 md:px-7">
        <div className="flex items-center w-1/3 overflow-hidden">
          <Image
            src={product?.image}
            alt="product"
            width={100}
            height={100}
            className=" object-cover bg-white p-1 border-2 border-gray-200  h-full w-[150px]"
          />
        </div>
        {/* --------info------------ */}
        <div className="w-2/3">
          <div className="">
            <div>
              <h2
                // onClick={() => }
                onClick={() => { productView(); }}
                className="text-sm text-slate-900  flex-wrap hover:scale-105 duration-150 cursor-pointer"
              >
                {product?.productTitle?.length > 55
                  ? product?.productTitle.slice(0, 55) + "..."
                  : product?.productTitle}
              </h2>
              <div className=" flex items-end mt-2">
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    ৳{product?.itemTotal}
                  </p>
                  <p className="text-slate-800 line-through text-xs mb-1">
                    ৳ {product.price}
                  </p>
                </div>
                <div className=" ml-auto flex items-center">
                  {/* <div>
                    <span
                      onClick={() => { handleSetLocalStorage(); addToCartHandle(); }}
                      className="btn btn-primary btn-xs text-white flex gap-2 items-center"
                    >
                      <AiOutlineShoppingCart size={18} />
                      Choose
                    </span>
                  </div> */}
                  <button className=" ml-2" onClick={handleDeleteCartItem}>
                    <MdDeleteForever
                      size={25}
                      className="text-red-600 hover:text-red-900 duration-150"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>
    </div>
  );
};

export default WishlistProductItems;
