import React, { useEffect } from "react";

const ProductSizePicker3 = ({ size, sizeIndex, handleSize,setInputSize,setSizeIndex }) => {
  // const [sizein,setSizein]=useState()


  return (
    <>
      {size?.length >= 1 && (
        <div>
          <h2 className="p-2 font-bold"> Size:</h2>

          <div className="flex mb-5">
            {size?.map((item, index) => (
              <>
                <div
                  key={index}
                  onClick={() =>handleSize(index, item)}
                
                  className={`mx-1 border items-center rounded-md font-bold ${
                    sizeIndex === index
                      ? "bg-[#000] text-white"
                      : "bg-[#fff] text-black"
                  } cursor-pointer flex gap-2 px-3 py-2 `}
                >
                  <span className="text-xs pt-[2px]">{item}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSizePicker3;
