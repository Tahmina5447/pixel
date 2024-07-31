
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import { getCategories } from "../../../../lib/helper";
import CreateContext from "../../CreateContex";
import CustomCategorySkeleton from "../../CustomSkeleton/CustomCategorySkeleton";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

const SiebarMenu = ({ catagories }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [activeChildCategory, setActiveChildCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (catagories) {
      setIsLoading(false)
    }
  }, [catagories])

  // const {
  //   data: categories,
  //   isLoading,
  //   refetch,
  // } = useQuery(["categories"], getCategories);

  const handleParentCategoryMouseEnter = (parentCategory) => {
    setActiveParentCategory(parentCategory);
  };

  const handleParentCategoryMouseLeave = () => {
    setActiveParentCategory(null);
  };
  const handleChildCategoryMouseEnter = (childCategory) => {
    setActiveChildCategory(childCategory);
  };

  const handleChildCategoryMouseLeave = () => {
    setActiveChildCategory(null);
  };

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
    <div className="">
      <ul id="catagory-menu" className=" min-h-[250px] bg-white shadow-md">
        <>
          {
            isLoading ?
              <CustomCategorySkeleton />
              :
              <>
                {catagories?.data?.result?.slice(0, 8).map((category) => {
                  const isParentCategoryActive = activeParentCategory === category?.parent_category;
                  const hasChildCategories = category?.first_child_Category?.length > 0;
                  return (
                    <li
                      key={category._id}
                      id="parent-category"
                      className=" avenir2"
                      onMouseEnter={() =>
                        handleParentCategoryMouseEnter(category.parent_category)
                      }
                      onMouseLeave={handleParentCategoryMouseLeave}
                    >
                      <Link
                        onClick={() =>
                          // setQueryFromCategory(`category=${category.parentCategory}`)
                          handelCategoryParams(category.parent_category)
                        }
                        href={`/category/${category?.parent_category}`}
                        className=" px-4 py-2 "
                      >
                        <span className="flex items-center justify-between text-sm font-medium">
                          {category.parent_category}
                          {hasChildCategories && <Icon className='text-lg text-black' icon="iconamoon:arrow-right-2-light" />}
                        </span>
                      </Link>
                      {/* dropdown */}
                      {hasChildCategories && (
                        <ul
                          className={`${isParentCategoryActive ? "visible" : "hidden"
                            } absolute mt-2 min-h-[250px] left-[295px] shadow-md py-2`}
                        >
                          {category.first_child_Category?.map((child, index) => {
                            const isChildCategoryActive = activeChildCategory === child?.firstChildTitle;
                            return (
                              <li key={index}>
                                <Link
                                  onClick={() =>
                                    handelChildeCategoryParams(child)
                                  }
                                  href="/shop"
                                  className="text-sm cursor-pointer"
                                  onMouseEnter={() =>
                                    handleChildCategoryMouseEnter(child?.firstChildTitle)
                                  }
                                  onMouseLeave={handleChildCategoryMouseLeave}
                                >
                                  <span className="flex items-center justify-between text-sm font-medium">
                                    {child?.firstChildTitle}
                                    {child?.secondChilds?.length > 0 && <Icon className='text-lg text-black' icon="iconamoon:arrow-right-2-light" />}
                                  </span>
                                </Link>
                                {child?.secondChilds?.length > 0 && (
                                  <ul
                                    className={`${isChildCategoryActive && isParentCategoryActive ? "visible" : "hidden"
                                      } absolute mt-2 left-[190px] min-h-[250px] shadow-md py-2`}
                                  >
                                    {child?.secondChilds?.map((child, index) => (
                                      <li key={index}>
                                        <Link
                                          onClick={() =>
                                            handelChildeCategoryParams(child)
                                          }
                                          href="/shop"
                                          className="text-sm cursor-pointer"
                                        >
                                          {child}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            )

                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </>
          }
        </>
      </ul>
    </div>
  );
};

export default SiebarMenu;
