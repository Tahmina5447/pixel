
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import AuthUser from "../../lib/AuthUser";
import { useMyShopData } from "../hooks/useMyShopData";
import { MdLocationOn, MdOutlineAlternateEmail, MdPhone } from "react-icons/md";
import Image from "next/image";
import { Icon } from "@iconify/react";
const Footers = () => {
  const { userInfo } = AuthUser();

  const { data, isLoading, refetch } = useMyShopData();

  return (
    <>
      <div className="py-6 md:py-16 bg-gray-100 ">
        <div className="px-5 md:px-10 lg:flex gap-5 md:gap-10 pb-20 pd:mb-10 lg:pb-0">
          <div className="w-full lg:w-2/4 lg:pr-10">
            <span className="text-xl sm:text-2xl avenir2">
              About Us
            </span>
            <p className="mt-3 text-[15px] text-gray-800 leading-6 text-justify avenir2">
              Art is not always about pretty things. It is about who we are, what happened to us and how our lives are affected.
              <br />
              <br />
              Pixels brings you the biggest collection of luxury stationery in Bangladesh. We hope that our quality products and consistent service will captivate every stationery lover, artist, crafter, and aesthetic person.
              <br />
              <br />
              Delivering all over Bangladesh within 3 to 5 days.
            </p>
          </div>

          <div className="w-full lg:w-1/4 mr-0 mt-5 lg:mt-0">
            <span className=" text-xl sm:text-2xl avenir2">
              Quick Links
            </span>
            <div className="mt-3 text-[15px] avenir2 flex flex-col gap-2">
              <Link href={"/return-policy"} className="link link-hover">
                Refund and Exchange Policy
              </Link>
              <Link href={"/magazine"} className="link link-hover">
                Blog
              </Link>
              <Link href={"/"} className="link link-hover">
                Search
              </Link>
              <a href={
                data?.data?.facebookPage ||
                data?.data?.facebookGroup ||
                "/"
              } target={"_blank"} className="link link-hover">
                Facebook
              </a>
              <a href={'https://www.instagram.com/pixels.ultra'} target={"_blank"} className="link link-hover">
                Instagram
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/4 mt-5 lg:mt-0">
            <span className=" text-xl sm:text-2xl avenir2">
              Contact Us
            </span>
            <div className="flex flex-col gap-2  font-semibold  mt-3 avenir2">
              <p className=" flex items-center flex-wrap gap-1">
                <Icon className="text-xl text-primary" icon="ic:outline-email" />
                {data?.data?.email}
              </p>
              <p className=" flex flex-wrap gap-1">
                <MdPhone size={20} className="text-primary" />
                {data?.data?.phone}, 01992636297
              </p>

            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Footers;
