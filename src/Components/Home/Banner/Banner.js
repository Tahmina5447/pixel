import React from "react";
import SidebarMenu from "./SiebarMenu";
import SliderInHeader from "./SliderInHeader";

const Banner = ({ data, catagories }) => {
  return (
    <div className="">
      <div className="">
        <h1 className=" text-black text-xl md:text-[28px] font-bold text-center p-2 md:p-4 avenir4">
          Art for every soul.
        </h1>
        <div className="flex gap-0 md:gap-3">
          {/* <div className="lg:w-[27%] lg:block hidden max-h-96 bg-white mt-4 pt-3 rounded-sm">
            <SidebarMenu catagories={catagories}/>
          </div> */}

          {/* -----------------------------slider */}
          <div className=" w-full">
            <SliderInHeader data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
