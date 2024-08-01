import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategories, products } from "../../lib/helper";
import SliderInHeader from "../../src/Components/Home/Banner/SliderInHeader";
import ProductCard from "../../src/Shared/ProductCard";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FilterByCategoryRow from "../../src/Components/Shop/FilterByCategoryRow";
import FilterBySubCategory from "../../src/Components/Shop/FilterBySubCategory";
import { AiFillFilter } from "react-icons/ai";
import ShopPageDrawer from "../../src/Shared/drawer/ShopPageDrawer";
import CreateContext from "../../src/Components/CreateContex";
import CustomPagination from "../../src/Shared/CustomPagination";
import LoadingComponets from "../../src/Shared/LoadingComponets";
import CustomProductSectionSkeleton from "../../src/Components/CustomSkeleton/CustomProductSectionSkeleton";
import { Icon } from "@iconify/react";
import FilterBySecondChildCategory from "../../src/Components/Shop/FilterBySecondChildCategory";
const Shop = () => {
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false);


  const newCurrentItems = [...currentItems]?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilterPrice],
    () => products(queryFilterPrice)
  );

  // console.log("-------------------data",data)
  const {
    data: categories,
    isLoading: categoryLoading,
    refetch: categoryRefetch,
  } = useQuery(["category"], getCategories);


  // for when click any category
  useEffect(() => {
    if (queryFromCategory.length > 0) {
      setQueryFilterPrice(queryFromCategory);
      refetch(["products", queryFromCategory]);
    } else {
      setQueryFilterPrice("");
      refetch(["products"]);
    }
  }, [queryFromCategory]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFilterByPrice = (e) => {
    e.preventDefault();
    let minPrice = e.target.minPrice.value;
    let maxPrice = e.target.maxPrice.value;
    setQueryFilterPrice(
      `salePrice[gte]=${minPrice}&salePrice[lte]=${maxPrice}`
    );
    refetch(["products", queryFilterPrice]);
  };
  const handlePriceSort = (e) => {
    let value = e.target.value;
    if (value === "lth") {
      setQueryFilterPrice(`sort=salePrice`);
      refetch(["products", value]);
    } else {
      setQueryFilterPrice(`sort=-salePrice`);
      refetch(["products", value]);
    }
  };
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const leftSideBar = (
    <div className="overflow-scroll h-[90vh] md:h-full shadow-md mr-1.5">
      <form
        onSubmit={handleFilterByPrice}
        className="bg-white p-3 md:p-5 rounded-md mb-1 md:mb-6"
      >
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">Filter By Price</h3>
        </div>
        <div className="filter-body">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              {...register("minPrice", { required: true })}
              placeholder="Min - 00"
              className="w-full block h-11 rounded-md bg-[#f5f5f5] text-center text-[#555] text-sm"
            />

            <input
              type="number"
              placeholder="Max - 5k"
              {...register("maxPrice", { required: true })}
              className="w-full block h-11 rounded-md bg-[#f5f5f5] text-center text-[#555] text-sm "
            />
          </div>
        </div>

        <div className=" mt-3 mb-1">
          <button
            type="submit"
            className="text-sm flex items-center justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
          >
            <FaSearch />
            <span className="font-bold">Search</span>
          </button>
        </div>
      </form>
      <div className="bg-white p-3  md:p-5 rounded-md mb-1 md:mb-6">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">
          Filter By Category
          </h3>
        </div>
        {/* filter by category */}
        <FilterByCategoryRow
          setQueryFilterPrice={setQueryFilterPrice}
          queryFilterPrice={queryFilterPrice}
          categories={categories}
          refetch={refetch}
        />
      </div>
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
      <div className="bg-white p-3 md:p-5 rounded-md mb-1 md:mb-6">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">
            Filter By Second Child  Category
          </h3>
        </div>
        <FilterBySecondChildCategory
          categories={categories}
          setQueryFilter={setQueryFilterPrice}
          refetch={refetch}
        />
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="px-2 md:px-10">
        <div className="py-0 md:py-5">
          <div className="flex gap-10">
            <div className=" w-full">
              <div className="flex items-center justify-between my-5 md:pb-3 pt-0 md:pt-1">
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
                <span className=" text-xs md:text-[16px]  -ml-12 avenir2">{data?.data?.products?.length} Products</span>
                <div className="flex gap-3 items-center">
                  
                </div>
              </div>
              <div className="lg:flex mt-3">
                <div className={showFilter === true ? 'w-[30%] xl:w-[23%] block' : 'hidden'}>
                  {leftSideBar}
                </div>
                {data?.data?.products?.length===0?<>
                <div className="flex items-center h-[50vh] w-full justify-center">
                  <span className="text-xl font-bold text-black/40 ">Product Not Available</span>
                </div>
                </>:<>
                  {!isLoading ? (
                  <div className="flex justify-center">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto gap-1 md:gap-3 lg:gap-5">
                      {newCurrentItems?.map((item) => (
                         <div className="flex justify-center">
                         <ProductCard key={item._id} product={item}></ProductCard>
                                                         </div>
                        
                      ))}
                    </div>

                    <CustomPagination
                      arrayData={data?.data?.products}
                      setCurrentItems={setCurrentItems}
                      itemsPerPage={16}
                    />
                  </div>
                ) : (
                  <div className="w-full"><CustomProductSectionSkeleton /></div>
                )}
                </>}
                
              </div>
            </div>
          </div>
        </div>
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

export default Shop;
