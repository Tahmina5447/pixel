import React, { useContext, useEffect, useState } from "react";

import { getCategories } from "../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "./LoadingComponets";
import CreateContext from "../Components/CreateContex";
import Link from "next/link";
import Image from "next/image";

const NaveCategory = ({ title, toggleDrawerCatagory, toggle = false }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [active, setActive] = useState("");
  const [activeChildCategory, setActiveChildCategory] = useState();

  const {
    data: catagories,
    isLoading,
    refetch,
  } = useQuery(["category"], getCategories);

  //   if (isLoading) {
  //     return (
  //       <div className="block md:hidden">
  //         <LoadingComponets />
  //       </div>
  //     );
  //   }

  useEffect(() => {
    if (catagories) {
      const newData = catagories?.data?.result?.find(
        (item) => item?.parentCategory === title
      );
      setActiveChildCategory(newData);
    }
  }, [catagories]);


  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  const handelChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("subCategory", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  return (
    <>
      <li className=" group relative">
        <Link
          onClick={() => {
            handelCategoryParams(title);
          }}
          href={`/category/${title}`}
          className="py-5 text-white border-b-2 border-transparent hover:border-white duration-500 uppercase"
        >
          {title}
        </Link>

        {activeChildCategory?.childCategory?.length && (
          <div className=" absolute left-0 hidden group-hover:block top-[39px] w-[300px] overflow-y-scroll h-[200px] bg-white shadow-2xl py-3">
            {activeChildCategory?.childCategory.map((child, index) => (
              <Link
                key={index}
                onClick={() => {
                  handelChildeCategoryParams(child);
                }}
                href={"/shop"}
             
                className={`flex items-center gap-2  px-4 py-2  hover:xs:text-white  hover:md:text-primary avenir2`}
              >
                <span className="text-sm font-medium "> {child} </span>
              </Link>
            ))}
          </div>
        )}
      </li>
    </>
  );
};

export default NaveCategory;
