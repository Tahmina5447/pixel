import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { reactLocalStorage } from "reactjs-localstorage";

import updateCartLocalStorage from "../../../lib/updateCartLocalStorage";
import CreateContext from "../../Components/CreateContex";
import { useRouter } from "next/router";
import Image from "next/image";

const SelectProductItem = ({ product, handleSelectProduct, getProductId }) => {
  const { addToCartRefresher, setAddToCartRefresher } =
    useContext(CreateContext);
  const router = useRouter();
  const [mewColor, setMewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newDesign, setNewDesign] = useState("");
  const [newSet, setNewSet] = useState("");
  const [newOther, setNewOther] = useState("");
  const [filterItem, setFilteredItem] = useState();

  const handleIncreaseProduct = () => {
    const action = "add";
    updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);
    // let newCount = count + 1;
    // setCount(newCount);
  };
  const handleDecreseProduct = () => {
    const action = "minus";
    updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);

    /*    let newCount = count - 1;
    setCount(newCount); */
  };

  const handleDeleteCartItem = () => {
    updateCartLocalStorage({ product, action: "delete" });
    setAddToCartRefresher(!addToCartRefresher);
  };

  const filterVariants = (criteria) => {
    const { size, color, design, other, set } = criteria;

    const result = product?.variant.find(
      (item) =>
        (size ? item.size === size : true) &&
        (color ? item.color === color : true) &&
        (design ? item.design === design : true) &&
        (other ? item.other === other : true) &&
        (set ? item.set === set : true)
    );

    setFilteredItem(result);
  };

  useEffect(() => {
    filterVariants({
      color: mewColor,
      size: newSize,
      set: newSet,
      other: newOther,
      design: newDesign,
    });
  }, [mewColor, newSize, newSet, newOther, newDesign, product]);

  const isSelected = Boolean(
    getProductId.find((grpStud) => grpStud._id === product._id)
  );

  return (
    <div
      onClick={() => handleSelectProduct(product,filterItem)}
      className={`my-2 mx-2 cursor-pointer border-2  ${
        isSelected ? "border-red-400" : ""
      } `}
    >
      <div className="flex items-center  gap-3 bg-primary bg-opacity-25 border-y-base-300 p-3">
        <div className="flex items-center w-[100px] overflow-hidden">
          <Image
            src={product?.imageURLs[0]}
            alt="product"
            width={100}
            height={100}
            className=" object-cover bg-white p-1 border-2 border-gray-200  h-full w-[100px]"
          />
        </div>
        {/* --------info------------ */}
        <div className="w-2/3">
          <div className="">
            <div>
              <h2
                // onClick={() => router.push(`/product/${product?._id}`)}
                className="text-sm text-slate-900  flex-wrap cursor-pointer hover:scale-105 duration-150"
              >
                {product?.productTitle?.length > 55
                  ? product?.name.slice(0, 55) + "..."
                  : product?.name}
              </h2>
              <div className=" flex items-end mt-2">
                <div>
                  <p className="text-slate-800  text-sm font-bold mb-1">
                    ৳ {product?.salePrice}
                  </p>
                  <p className="text-slate-800 line-through text-xs mb-1">
                    ৳ {product.productPrice}
                  </p>
                </div>
                {/* <div className=" ml-auto flex items-center">
                  <div>
                    <div className="flex items-center justify-start border-gray-300 border-2 rounded-md">
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
                        value={product?.quantity}
                        disabled
                      />
                      <button
                        onClick={handleIncreaseProduct}
                        className="btn-xs text-xl font-bold flex items-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button className=" ml-2" onClick={handleDeleteCartItem}>
                    <MdDeleteForever
                      size={25}
                      className="text-red-600 hover:text-red-900 duration-150"
                    />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProductItem;
