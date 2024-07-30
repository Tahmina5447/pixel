import React, { useContext, useEffect, useState } from "react";
import CreateContext from "../CreateContex";
import updateCartLocalStorage from "../../../lib/updateCartLocalStorage";
import NewColorPiker from "../ProductSection/NewColorPiker";

const SizeAndColorInCheckout = ({ product, setIsOpen }) => {
  const [mewColor, setMewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newDesign, setNewDesign] = useState("");
  const [newSet, setNewSet] = useState("");
  const [newOther, setNewOther] = useState("");
  const [filterItem, setFilteredItem] = useState();
  const [userProductColor, setUserProductColor] = useState(
    product.userColor || " "
  );

  useEffect(() => {
    setMewColor(product.color);
    setNewSize(product.size);
    setNewDesign(product.design);
    setNewSet(product.set);
    setNewOther(product.order);
  }, [product]);

  const { setAddToCartRefresher, addToCartRefresher } =
    useContext(CreateContext);
  const handleSaveSizeInLocal = () => {
    product.color = mewColor,
    product.size = newSize;
    product.design = newDesign;
    product.set = newSet;
    product.other = newOther;
    product.userSize = filterItem;
    product.userSelectSize = filterItem;
    const action = "size";
    updateCartLocalStorage({ product, action });


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

export default SizeAndColorInCheckout;
