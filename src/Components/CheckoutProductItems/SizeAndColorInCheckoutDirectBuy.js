import React, { useContext, useEffect, useState } from "react";
import CreateContext from "../CreateContex";
import updateCartLocalStorage from "../../../lib/updateCartLocalStorage";
import ProductColorPicker from "../ProductSection/ProductColorPicker";
import ProductColorPickerNew from "../ProductSection/ProductColorPickerNew";
import NewColorPiker from "../ProductSection/NewColorPiker";

const SizeAndColorInCheckoutDirectBuy = ({
  product,
  setIsOpen,
  userSizeAndColor,
}) => {
  const [sizeIndex, setSizeIndex] = useState(0);

  const {
    newSize,
    setNewSize,
    mewColor,
    setMewColor,
    newSet,
    setNewSet,
    newDesign,
    setNewDesign,
    newOther,
    setNewOther,
  } = userSizeAndColor;

  const { setAddToCartRefresher, addToCartRefresher } =
    useContext(CreateContext);
  const handleSaveSizeInLocal = () => {
    product.userSize = inputSize;
    product.userColor = userColor;
    const action = "size";
    // updateCartLocalStorage({ product, action });
    setAddToCartRefresher(!addToCartRefresher);
  };

  const handleSize = (index, item) => {
    setSizeIndex(index);
    setInputSize(item);
  };

  return (
    <div>
      <NewColorPiker
        title="Colors"
        productColor={product?.attributes?.colors}
        setMewColor={setMewColor}
        newColor={mewColor}
      />

      <NewColorPiker
        title="Size"
        productColor={product?.attributes?.sizes}
        setMewColor={setNewSize}
        newColor={newSize}
      />
      <NewColorPiker
        title="Design"
        productColor={product?.attributes?.design}
        setMewColor={setNewDesign}
        newColor={newDesign}
      />
      <NewColorPiker
        title="Set"
        productColor={product?.attributes?.set}
        setMewColor={setNewSet}
        newColor={newSet}
      />
      <NewColorPiker
        title="Other"
        productColor={product?.attributes?.others}
        setMewColor={setNewOther}
        newColor={newOther}
      />

      <button
        onClick={() => {
          // handleSaveSizeInLocal();
          setIsOpen(false);
        }}
        className="bg-primary px-5 py-1 text-white rounded-sm mt-3 hover:bg-opacity-0 hover:text-primary duration-150 border border-primary"
      >
        Save
      </button>
    </div>
  );
};

export default SizeAndColorInCheckoutDirectBuy;
