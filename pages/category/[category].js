import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import server_url from "../../lib/config";
import { useQuery } from "react-query";
import CustomProductSectionSkeleton from "../../src/Components/CustomSkeleton/CustomProductSectionSkeleton";
import ProductCard from "../../src/Shared/ProductCard";
import CreateContext from "../../src/Components/CreateContex";
import ShopPagination from "../../src/Shared/ShopPageniation";
import { Icon } from "@iconify/react/dist/iconify.js";
import FilterBySubCategory from "../../src/Components/Shop/FilterBySubCategory";
import ShopPageDrawer from "../../src/Shared/drawer/ShopPageDrawer";
import { getCategories } from "../../lib/helper";

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { category } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const { queryFromCategory } = useContext(CreateContext);
  const [showFilter, setShowFilter] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const encodedCategory = encodeURIComponent(category);
  const itemsPerPage = 10;

  const { data, refetch, isSuccess, isLoading } = useQuery({
    queryKey: ["product", queryFromCategory, queryFilterPrice, encodedCategory, currentPage],
    queryFn: () =>
      fetch(
        `${server_url}/product?status=true&category=${encodedCategory}&sort=${queryFilterPrice}&limit=${itemsPerPage}&page=${currentPage}`
      ).then((res) => res.json())
    // Pass the initial data fetched on the server
  });


  const {
    data: categories,
    isLoading: categoryLoading,
    refetch: categoryRefetch,
  } = useQuery(["category"], getCategories);

  const allProducts = data?.data?.products;
  const totalItems = data?.data?.total || 0;
  console.log(totalItems)
  const handlePriceSort = (e) => {
    let value = e.target.value;
    if (value === "lth") {
      setQueryFilterPrice("-salePrice");
    } else {
      setQueryFilterPrice("salePrice");
    }
    refetch();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const leftSideBar = (
    <div className="overflow-scroll h-[90vh] md:h-full shadow-md mr-1.5">
      <div className="bg-white p-3 md:p-5 rounded-md mb-1 md:mb-6">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">
            Filter By First Child  Category
          </h3>
        </div>
        <FilterBySubCategory
          categories={categories}
          setQueryFilter={setQueryFilterPrice}
          refetch={refetch}
        />
      </div>
    </div>
  );

  return (
    <div className="py-5 md:py-10">
      <div className="px-2 md:px-10">
        <p className="text-xl capitalize font-bold  mb-5">{category}</p>
        <div className="flex items-center justify-between gap-5 flex-wrap mb-8 md:mb-10">
          <div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="hidden  text-xs md:text-[16px] cursor-pointer lg:flex justify-center items-center "
            >
              Filter <Icon className="ml-2" icon="iconamoon:arrow-right-2-fill" />
            </button>
            <div
              onClick={toggleDrawer}
              className=" text-xs md:text-[16px] cursor-pointer lg:hidden flex justify-center items-center  "
            >
              Filter <Icon className="ml-2" icon="iconamoon:arrow-right-2-fill" />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <p className="font-bold hidden lg:block">Sort by :</p>
            <div>
              <select
                onChange={handlePriceSort}
                className="select select-primary w-full max-w-xs focus:outline-none"
              >
                <option disabled selected hidden>
                  Best Match
                </option>
                <option value={"lth"}>Price Low to High</option>
                <option value={"htl"}>Price High to Low</option>
              </select>
            </div>
          </div>
        </div>
        {!isLoading ? (
          <div className="flex flex-col justify-between items-center gap-2">
            <div className="lg:flex mt-3">
              <div className={showFilter === true ? 'w-[30%] xl:w-[23%] block' : 'hidden'}>
                {leftSideBar}
              </div>
              <div>
                {allProducts?.length > 0 ? <>
                  <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
                    {allProducts?.map((item) => (
                      <ProductCard key={item._id} product={item}></ProductCard>
                    ))}
                  </div>
                </> : <>
                  <div className="h-[60vh] flex items-center justify-center text-2xl font-semibold text-black/50">
                    <p>No Products Found.</p>
                  </div>
                </>}
              </div>
            </div>



            {allProducts?.length > 1 && <>
              <ShopPagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>}

          </div>
        ) : (
          <CustomProductSectionSkeleton />
        )}
      </div>
      <ShopPageDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        dir={"left"}
        leftSideBar={leftSideBar}
      ></ShopPageDrawer>
    </div>
  );
};

export default CategoryPage;
