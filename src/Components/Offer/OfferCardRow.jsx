
import Image from "next/image";
import React, { useState } from "react";

const OfferCardRow = ({ coupon }) => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const useCountdown = (endTime) => {
    setInterval(() => {
      const countTime = new Date(endTime);
      const currentTime = new Date();

      const diffInSec = (countTime - currentTime) / 1000;

      if (diffInSec >= 0) {
        setDays(Math.floor(diffInSec / (60 * 60 * 24)));
        setHours(Math.floor((diffInSec % (60 * 60 * 24)) / (60 * 60)));
        setMinutes(Math.floor((diffInSec % (60 * 60)) / 60));
        setSeconds(Math.floor(diffInSec % 60));
      }
    }, 1000);
  };
  useCountdown(coupon.expireDate);
  const formateTime = (time) => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  return (
    <div className="bg-white rounded sm-7 p-5 md:col-span-2 sm:col-span-2 sm:grid lg:flex gap-5">
      <div className="imgAndOff lg:flex items-center gap-5">
        <div className="h-32 w-32">
          <Image
            src={coupon.imageURL[0]}
            alt="Offer Image"
            width={100}
            height={100}
            className="rounded aspect-square object-cover h-32 w-32"
          />
        </div>

        <div className="">
          <div className="font-bold flex items-end gap-3 my-5">
            <div className="text-center">
              <p className="text-xs">D</p>
              <p className="bg-gray-300 px-2 py-1 text-b text-sm  rounded">
                {days ? formateTime(days) : "00"}
              </p>
            </div>
            :
            <div className="text-center">
              <p className="text-xs">H</p>
              <p className="bg-gray-300 px-2 py-1 text-b text-sm  rounded">
                {hours ? formateTime(hours) : "00"}
              </p>
            </div>
            :
            <div className="text-center">
              <p className="text-xs">M</p>
              <p className="bg-gray-300 px-2 py-1 text-b text-sm  rounded">
                {minutes ? formateTime(minutes) : "00"}
              </p>
            </div>
            :
            <div className="text-center">
              <p className="text-xs">S</p>
              <p className="bg-gray-300 px-2 py-1 text-b text-sm  rounded">
                {seconds ? formateTime(seconds) : "00"}
              </p>
            </div>
          </div>
          <h1 className="m-2 font-medium">{coupon.campName}</h1>
          <h1 className="m-2 font-bold text-xl">
            <span className="text-amber-700">{coupon.discountPercentage}</span>{" "}
            % Off
          </h1>
        </div>
      </div>

      <div className="border-l-2 border-dashed p-3">
        <h1 className="font-semibold">
          Coupon :{" "}
          <span
            className={
              coupon.status === "active" ? "text-green-600" : "text-red-600"
            }
          >
            {coupon.status}
          </span>
        </h1>
        <button className="py-1 my-2  w-full border-2 border-orange-200 border-dashed">
          {coupon.couponCode}
        </button>
        <p className="text-xs my-2 ">
          * This coupon code will apply on {coupon.underOfCategory} category
          products and when you shopping more then ৳{coupon.minAmount}
        </p>
      </div>
    </div>
  );
};

export default OfferCardRow;
