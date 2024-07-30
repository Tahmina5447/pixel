import Image from "next/image";
import React from "react";


const DownloadApp = () => {
  return (
    <div className="lg:py-10 py-5">
      <div className="mid-container mx-auto mt-10 mb-10 ">
        <div className="rounded-lg bg-primary lg:p-14 sm:p-10 p-8">
          <div className="rounded-lg grid lg:grid-cols-3 bg-accent p-5">
            <div className="lg:col-span-2 lg:text-start text-center flex flex-col justify-center">
              <h3 className="text-xl font-medium">Organic Products and Food</h3>
              <h3 className="text-2xl font-bold">
                Quick Delivery to <span className="text-primary">Your Home </span>
              </h3>
              <p className="text-md mt-3">
                There are many products you will find our shop, Choose your daily
                necessary product from our KachaBazar shop and get some special
                offer. See Our latest discounted products from here and get a
                special discount.
              </p>
              <button className="mt-5 lg:mx-0 mx-auto w-44 btn bg-primary text-xs text-white rounded-full">
                Download App
              </button>
            </div>

            <div className="lg:col-span-1 hidden lg:block">
              <div className="flex justify-center">
                <Image
                  src="/homePageImage/delivery_bike.svg"
                  alt="Picture of the author"
                  className="px-10 py-5"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
