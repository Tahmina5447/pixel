import React from "react";

const ProductSizePicker2 = ({ size, setSeleteVariant, seleteVariant }) => {

  const  handleSize = (item)=>{
    setSeleteVariant(item)
  }

  return (
    <>
      {size?.length > 1 && (
        <div>
          <h2 className="p-2 font-bold"> Size:</h2>

          <div className="flex mb-5">
            {size?.map((item, index) => (
              <>
                <div
                  key={index}
                  onClick={() => handleSize(item)}
                  className={`mx-1 border items-center rounded-md font-bold ${
                    seleteVariant?.size === item?.size
                      ? "bg-[#000] text-white"
                      : "bg-[#fff] text-black"
                  } cursor-pointer flex gap-2 px-3 py-2 `}
                >
                  <span className="text-xs pt-[2px]">{item?.size}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSizePicker2;
