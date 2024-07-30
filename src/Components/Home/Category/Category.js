import { getCategories, products } from "../../../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "../../../Shared/LoadingComponets";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import CreateContext from "../../CreateContex";
import CustomFeaturedCategoriesSkeleton from "../../CustomSkeleton/CustomFeaturedCategoriesSkeleton";
import Image from "next/image";

const Category = ({ catagories }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    if (catagories) {
      setIsLoading(false);
    }
  }, [catagories]);

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  return (
    <>
      <div className="pb-5 px-2 md:px-0">
        <div className="">
          <h1 className="text-xl md:text-[28px]  text-center py-2 md:py-5  text-light-text avenir">
            Categories
          </h1>
          {isLoading ? (
            <CustomFeaturedCategoriesSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {catagories?.data?.result?.map((category, index) => (
                  <Link
                    key={index}
                    href={"/shop"}
                    onClick={() =>
                      // setQueryFromCategory(
                      //   `category=${category.parentCategory}`
                      // )
                      handelCategoryParams(category.parentCategory)
                    }
                    className="  "
                  >
                    <div className="w-full relative">
                      <Image
                        alt="category icon"
                        src={category?.imageURLs?.[0]}
                        width={700}
                        height={500}
                        className="w-full h-[375px]  md:h-[400px]"
                      />
                      <div className="bg-black/20 absolute top-0 left-0 w-full h-full"></div>
                      <h1 className="text-white text-2xl font-medium lg:font-[300] absolute left-5 md:text-[34px] bottom-5 avenir2">
                        {category.parentCategory}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
             
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
