import React, { useEffect } from "react";

const NewColorPiker = ({title, productColor, setMewColor, newColor }) => {


  return (
    <>
      {productColor?.length >=1 && (
        <div>
          <h2 className="p-2 font-bold">{title} : </h2>

          <div className="flex gap-2 mb-2 items-center px-2">
            {productColor?.map((clr, index) => (
              <span key={index}>
                <span
                  onClick={() => {
                    setMewColor(clr);
                  }}
                  className={` cursor-pointer text-[13px]  border-2 rounded-lg  py-2 px-3 ${clr===newColor ? " bg-primary text-white" : ""} `}
                >
                  {clr ? clr : ""}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NewColorPiker;
