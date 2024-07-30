import React, { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import Link from "next/link";
import { useCustomQuery } from "../../hooks/useMyShopData";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateContext from "../CreateContex";
import { setCookie } from "../../hooks/useCustomCookie";
import Image from "next/image";
import NavbarProductCard from "../../Shared/NavbarProductCard";
import { Icon } from "@iconify/react";

const NavbarSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searchEnable, setSearchEnable] = useState(false);
  const [search, setSearch] = useState(false);
  const containerRef = useRef(null);
  const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  //   const [result, setResult] = useState([]);
  const { data: result, loading } = useCustomQuery(
    ["product", searchValue],
    `product?status=true&search=${searchValue}`
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSearchEnable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCookie("searchQuery", e.target.search.value, 7);
    setSearchEnable(false);
    setQueryFromCategory(`search=${searchValue}`);
    router.push(`/shop`);
  };

  const handleIntersProductSave = (product) => {
    setCookie("searchQuery", searchValue, 7);
    setSearchEnable(false);
  };
  return (
    <>
      <div className="flex items-center gap-2 ml-2">
        <button className="flex items-center gap-1.5" onClick={() => setSearch(!search)}>
          <Icon className="text-light-text  text-2xl md:text-3xl  mt-[-6px] lg:mt-0" icon="fluent:search-32-regular" />
          <span className="hidden lg:block text-light-text text-[14px] avenir2">Search</span>
        </button>
        {/* <button  className="hidden lg:block text-light-text text-[14px] leading-[13px] px-[25px] py-4 bg-[#F4F1EC] hover:bg-black hover:text-white duration-500 avenir2" onClick={() => setSearch(!search)}>
          FIND YOUR STYLE
        </button> */}
      </div>


      <div className={`px-5 md:px-10 bg-white z-50 md:py-5 ${search === true ? 'navbar-center w-full absolute top-[55px] sm:top-[73px] md:top-[67px] duration-700 left-0 ' : 'absolute duration-700 w-full right-0 top-[-200px] lg:hidden'}`}>
        <div className="form-control w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center"
          >
            <input
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchEnable(true);
              }}
              placeholder="Search Product"
              className="border border-primary block w-full h-10 rounded-l px-2"
              style={{ outline: "none" }}
              name="search"
            />
            <button
              type="submit"
              className="bg-primary  border-none hover:bg-black h-10 rounded-r px-4"
            >
              <AiOutlineSearch size={22} className="text-white" />
            </button>
          </form>
          {/* search product list */}
          {result?.status === "success" &&
            searchEnable &&
            searchValue.length > 1 && (
              <div
                ref={containerRef}
                className="w-full max-h-[350px] bg-white border-gray-200 border p-3 rounded-sm overflow-y-scroll shadow-xl absolute top-16 z-10 left-0 right-0"
              >
                {result.data.products.length > 0 ? (
                  result.data.products.slice(0, 10).map((product) => (
                    <NavbarProductCard product={product} />
                  ))
                ) : (
                  <div className="text-center uppercase py-8">
                    Product Not found
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      {/* <div className="navbar-center hidden lg:flex justify-center items-center relative lg:w-[55%] w-full">
        <div className="form-control w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center"
          >
            <input
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchEnable(true);
              }}
              placeholder="Search Product"
              className="border border-[#5792E8] block w-full h-10 rounded-l px-2"
              style={{ outline: "none" }}
              name="search"
            />
            <button
              type="submit"
              className="bg-[#5792E8]  border-none hover:bg-black h-10 rounded-r px-4"
            >
              <AiOutlineSearch size={22} className="text-white" />
            </button>
          </form>
          search product list
          {result?.status === "success" &&
            searchEnable &&
            searchValue.length > 1 && (
              <div
                ref={containerRef}
                className="w-full max-h-[350px] bg-white border-gray-200 border p-3 rounded-sm overflow-y-scroll shadow-xl absolute top-10 z-10 left-0 right-0"
              >
                {result.data.products.length > 0 ? (
                  result.data.products.slice(0, 10).map((product) => (
                    <NavbarProductCard product={product} />
                  ))
                ) : (
                  <div className="text-center uppercase py-8">
                    Product Not found
                  </div>
                )}
              </div>
            )}
        </div>
      </div> */}
    </>
  );
};

export default NavbarSearch;
