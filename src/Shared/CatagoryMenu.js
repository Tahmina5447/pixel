import React, { useContext, useEffect, useState } from "react";

import { getCategories } from "../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "./LoadingComponets";
import CreateContext from "../Components/CreateContex";
import Link from "next/link";
import Image from "next/image";

const CatagoryMenu = ({ toggleDrawerCatagory, toggle = false }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [active, setActive] = useState("");
  const [activeChildCategory, setActiveChildCategory] = useState("");

  const {
    data: catagories,
    isLoading,
    refetch,
  } = useQuery(["category"], getCategories);

  if (isLoading) {
    return (
      <div className="block md:hidden">
        <LoadingComponets />
      </div>
    );
  }

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
  }

  const handelChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("subCategory", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
  }


  return (
    <ul
      className="py-2 bg-primary  w-full uppercase  overflow-hidden font-bold  lg:h-[350px] overflow-y-scroll avenir2"
      id="test-catagory-menus "
    >
      {/* {catagories?.data?.result?.map((category) => {
        return (
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              onClick={() => setActive(category.parentCategory)}
              className={`flex cursor-pointer  items-center  justify-between border-b font-bold border-white/20 text-white px-4 py-2 avenir2 ${active === category.parentCategory
                ? " bg-opacity-100  "
                : "bg-opacity-0  "
                }   `}
            >
              <Link
                onClick={() => {
                  handelCategoryParams(category.parentCategory)
                  if (toggle) {
                    toggleDrawerCatagory();
                  }
                }}
                href={"/shop"}
                className="flex items-center gap-2"
              >
                
                <span className="text-sm font-bold">
                  {category.parentCategory}
                </span>
              </Link>

              {category?.childCategory.length > 0 && (
                <span
                  onClick={() => {
                    setActiveChildCategory("");
                    setActive("");
                  }}
                  className="shrink-0 transition duration-300 group-open:-rotate-180"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </summary>
            {category?.childCategory.length > 0 && (
              <nav aria-label="Teams Nav" className="flex flex-col px-4">
                {category?.childCategory.map((child, index) => (
                  <Link
                    onClick={() => {
                      // setQueryFromCategory(`subCategory=${child}`);
                      handelChildeCategoryParams(child)
                      setActiveChildCategory(child);
                      setActive(category.parentCategory);
                      if (toggle) {
                        toggleDrawerCatagory();
                      }
                    }}
                    href={"/shop"}
                    className={`flex items-center gap-2 text-white px-4 py-2     ${activeChildCategory === child
                      ? " "
                      : ""
                      }`}
                  >
                    <span className="text-xs font-medium "> - {child} </span>
                  </Link>
                ))}
              </nav>
            )}
          </details>
        );
      })} */}
    </ul>
  );
};

export default CatagoryMenu;
