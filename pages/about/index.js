import React from "react";
import SecondaryImageCover from "../../src/Shared/SecondaryImageCover";
import Head from "next/head";
import { useQuery } from "react-query";
import Image from "next/image";
import GoogleMap from "../../src/Shared/GoogleMap";

const AboutUs = () => {
  return (
    <div>
      <Head>
        <title>About Us | Ecommerce Website</title>
      </Head>
      <SecondaryImageCover title={"about us"} />
      <div className="mid-container">

        <div className="w-full lg:w-1/2 mx-auto">
          <h2 className="font-bold text-3xl my-5">
            Welcome to our Pixels
          </h2>
          <p>
            At Pixels, we believe in bringing you an unparalleled shopping experience that caters to all your needs under one virtual roof. From the latest gadgets to trendy fashion, from home essentials to delightful gifts, we've curated a diverse collection to delight every shopper.


            <br />
            <br />
            Discover Endless Choices:
            Explore our extensive range of products carefully selected to meet the demands of modern living. Whether you're searching for stylish apparel to revamp your wardrobe, cutting-edge electronics to upgrade your tech game, or unique decor pieces to personalize your space, Pixels has you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  py-5">

          {/* image here  */}
          {/* <div className="p-3 md:p-6">
            <Image
              src={
                "/logo1.jpg"
              }
              width={200}
              height={50}
              className="w-[200px]"
              alt="about image group"
            />
          </div> */}
        </div>
        {/* <div className="my-5">
         <GoogleMap />
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;
