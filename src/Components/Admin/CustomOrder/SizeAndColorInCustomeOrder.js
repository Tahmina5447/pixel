import React, { useContext, useEffect, useState } from "react";

import updateCartLocalStorage from "../../../../lib/updateCartLocalStorage";
import ProductColorPickerNew from "../../ProductSection/ProductColorPickerNew";
import CreateContext from "../../CreateContex";

const SizeAndColorInCustomeOrder = ({ product, setIsOpen }) => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState(product.userSize || " ");
  const [inputSize2, setInputSize2] = useState(product?.userSelectSize || " ");
  const [userProductColor, setUserProductColor] = useState(
    product.userColor || " "
  );

  const { setAddToCartRefresher, addToCartRefresher } =
    useContext(CreateContext);
  const handleSaveSizeInLocal = () => {
    product.userSize = inputSize;
    product.userColor = userProductColor;
    product.userSelectSize = inputSize2;
    const action = "size";
    updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);
  };

  useEffect(()=>{
    if(inputSize){
      setInputSize2(inputSize?.size2[0])
    }
  },[inputSize])


  const handleSize = (index, item) => {
    setSizeIndex(index);
    setInputSize(item);
  };
  return (
    <div>
      {product?.type === "clothing" ? (
        <>
          {product?.variant?.length > 0 && (
            <ProductColorPickerNew
              productColor={product?.variant}
              setUserProductColor={setInputSize}
              userProductColor={inputSize}
            />
          )}

          <h2 className="p-2 font-bold">Size:</h2>
          {inputSize?.size2?.length > 0 && (
            <div className="flex flex-wrap mb-2">
              {inputSize?.size2?.map((item, index) => (
                <>
                  <div
                    onClick={() => setInputSize2(item)}
                    key={index}
                    className={`mx-1 border items-center rounded-md font-bold ${
                      item === inputSize2
                        ? "bg-[#000] text-white"
                        : "bg-[#fff] text-black"
                    } cursor-pointer flex gap-2 p-1 text-xs `}
                  >
                    <span className="text-xs pt-[2px]">{item}</span>
                  </div>
                </>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="p-2 font-bold">Size:</h2>
          {product?.variant.length > 0 && (
            <div className="flex flex-wrap mb-2">
              {product?.variant?.map((item, index) => (
                <>
                  <div
                    onClick={() => handleSize(index, item)}
                    key={index}
                    className={`mx-1 border items-center rounded-md font-bold ${
                      item.size === inputSize.size
                        ? "bg-[#000] text-white"
                        : "bg-[#fff] text-black"
                    } cursor-pointer flex gap-2 p-1 text-xs `}
                  >
                    <span className="text-xs pt-[2px]">{item.size}</span>
                  </div>
                </>
              ))}
            </div>
          )}
        </>
      )}

      <button
        onClick={() => {
          handleSaveSizeInLocal();
          setIsOpen(false);
        }}
        className="bg-primary px-5 py-1 text-white rounded-sm mt-3 hover:bg-opacity-0 hover:text-primary duration-150 border border-primary"
      >
        Save
      </button>
    </div>
  );
};

export default SizeAndColorInCustomeOrder;
