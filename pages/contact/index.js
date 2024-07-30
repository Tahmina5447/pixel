
import AppAds from "../../src/Components/Home/AppAds/AppAds";
import { BsChatSquareText } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import Contact from "../../src/Components/Contact/Contact";
import SecondaryImageCover from "../../src/Shared/SecondaryImageCover";
import Link from "next/link";

const Contacts = () => {
  return (
    <>
      <SecondaryImageCover title={"Contact Us"} />

      <div className="lg:py-16 sm:py-10 py-5">
        <div className="mid-container">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            <div className="text-center px-6 pt-7 pb-9 border  rounded grid gap-1">
              <div className="">
                <div className="flex justify-center text-4xl text-primary mb-1">
                  <BsChatSquareText />
                </div>
                <h1 className="text-xl font-semibold">Email Us</h1>
                <span className="text-primary font-semibold">
                  pixelsultra@gmail.com
                </span>
              </div>

            </div>
            <div className="text-center px-6 pt-7 pb-9 border rounded grid gap-1">
              <div className="">
                <div className="flex justify-center text-4xl text-primary mb-1">
                  <FiPhoneCall />
                </div>
                <h1 className="text-xl font-semibold">Call Us</h1>
                <span className="text-primary font-semibold">+8801992636297</span>
              </div>

            </div>
            <Link className=" border rounded group " href={"#"}>
              <div className="text-center px-6 pt-7 pb-9  grid gap-1">
                <div className="h-[50px]">
                  <div className="flex justify-center text-4xl text-primary mb-1 animate-bounce">
                    <GoLocation />
                  </div>
                  <h1 className="text-xl font-semibold">Location</h1>
                </div>
                <p className="mt-5">
                  <span className="text-primary font-semibold">Ground floor, The Grand Plaza Shopping Mall,</span>{" "}
                  Moghbazar Wireless, 227 Outer Circular Road Dhaka.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Contact />

      {/* <NewsLetter/> */}
      {/* <AppAds /> */}
    </>
  );
};

export default Contacts;
