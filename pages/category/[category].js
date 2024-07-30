import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import server_url from "../../lib/config";
import { useQuery } from "react-query";
import CustomProductSectionSkeleton from "../../src/Components/CustomSkeleton/CustomProductSectionSkeleton";
import ProductCard from "../../src/Shared/ProductCard";
import CreateContext from "../../src/Components/CreateContex";
import ShopPagination from "../../src/Shared/ShopPageniation";

const CategoryPage = ({ initialData }) => {
  const router = useRouter();
  const { category } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const { queryFromCategory } = useContext(CreateContext);

  const encodedCategory = encodeURIComponent(category);
  const itemsPerPage = 10;

  const { data, refetch, isSuccess, isLoading } = useQuery({
    queryKey: ["product", queryFromCategory, queryFilterPrice,encodedCategory, currentPage],
    queryFn: () =>
      fetch(
        `${server_url}/product?status=true&category=${encodedCategory}&sort=${queryFilterPrice}&limit=${itemsPerPage}&page=${currentPage}`
      ).then((res) => res.json())
    // Pass the initial data fetched on the server
  });
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

  return (
    <div className="py-5 md:py-10">
      <div className="mid-container">
        <div className="flex items-center justify-between gap-5 flex-wrap mb-8 md:mb-10">
          <p className="text-xl capitalize font-bold">{category}</p>
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

{allProducts?.length>0 ? <>
  <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {allProducts?.map((item) => (
                <ProductCard key={item._id} product={item}></ProductCard>
              ))}
            </div>
            </>:<>
            <div className="h-[60vh] flex items-center justify-center text-2xl font-semibold text-black/50">
             <p>No Products Found.</p>
            </div>
            </>}
            

            {allProducts?.length>1 && <>
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
    </div>
  );
};

export default CategoryPage;
