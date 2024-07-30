
import React from "react";
import { useMyShopData } from "../../../hooks/useMyShopData";
import Link from "next/link";
import { AiOutlineFacebook } from "react-icons/ai";
import Image from "next/image";

const AppAds = () => {
  const { data } = useMyShopData();

  return (
    <div className="bg-accent md:py-10 py-5">
      <div className="p-10 mx-auto mt-10 mb-10 grid grid-cols-9 mid-container">
        <div className="col-span-3 hidden lg:block">
          <Image
            src="/homePageImage/app_ads_image1.svg"
            alt="Picture of the author"
            className="p-10"
            width={500}
            height={500}
          />
        </div>
        <div className="lg:col-span-3 col-span-9 flex flex-col justify-center p-2">
          <h1 className="lg:text-3xl sm:text-2xl text-xl font-semibold text-center mb-5">
            Get Your Daily Needs From Our {data?.data?.shopName} Store
          </h1>
          <p className="text-center">
            There are many products you will find our shop, Choose your daily
            necessary product from our {data?.data?.shopName} shop and get some
            special offer.
          </p>
          <div className="grid grid-cols-2 mx-auto justify-center mt-10 text-white gap-5 max-w-[400px]">
            <Link
              href={data?.data?.facebookPage || "/"}
              className="bg-black px-5 py-3 text-xl font-bold text-white flex items-center justify-center gap-2 rounded-md
            "
            >
              <AiOutlineFacebook size={25} /> Page
            </Link>
            <Link
              href={data?.data?.facebookGroup || "/"}
              className="bg-black px-5 py-3 text-xl font-bold text-white flex items-center justify-center gap-2 rounded-md
            "
            >
              <AiOutlineFacebook size={25} /> Group
            </Link>
          </div>
        </div>
        <div className="col-span-3 hidden lg:block">
          <Image
            src="/homePageImage/app_ads_image2.svg"
            alt="Picture of the author"
            className="p-10"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default AppAds;
