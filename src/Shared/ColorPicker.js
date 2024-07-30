import { SketchPicker } from "@hello-pangea/color-picker";
import React from "react";
import CustomModal from "./CustomModal";
import { useState } from "react";
import Image from "next/image";

const ColorPicker = ({
  setProductColor,
  productColor,
  setIsOpen,
  modalIsOpen,
  imageUrl
}) => {
  const [color, setColor] = useState("#fff");

  const handleColorPicker = () => {
      setIsOpen(false);
      setProductColor([...productColor,color])
  };


  return (
    <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
      <div className={`w-full `} style={{ background: color }}>
          <div className=" flex items-start gap-2">
            <SketchPicker onChangeComplete={({ hex }) => setColor(hex)} />
            <div>
              {imageUrl?.map((item,index)=>(
                <Image src={item} width={30} height={30} className=" rounded-lg" alt="product"/>
              ))}
            </div>
          </div>
      </div>
      <span
        onClick={handleColorPicker}
        className="btn btn-sm btn-success hover:btn-primary text-white shadow-md rounded-md mt-5"
      >
        Save Product Color
      </span>
    </CustomModal>
  );
};

export default ColorPicker;
