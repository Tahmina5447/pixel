import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import server_url from "../../lib/config";
import CustomProductSectionSkeleton from "../../src/Components/CustomSkeleton/CustomProductSectionSkeleton";
import ProductCard from "../../src/Shared/ProductCard";
import ShopPagination from "../../src/Shared/ShopPageniation";

// `${server_url}/product?status=true&delivery=true&sort=${queryFilterPrice}`
const FreeDelivery = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 10;

  const { data, refetch, isSuccess, isLoading } = useQuery({
    queryKey: ["product", currentPage],
    queryFn: () =>
      fetch(
        `${server_url}/product?status=true&delivery=true&limit=${itemsPerPage}&page=${currentPage}`
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
          <p className="text-xl capitalize font-bold">Free Delivery</p>
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
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {allProducts?.map((item) => (
                <ProductCard key={item._id} product={item}></ProductCard>
              ))}
            </div>

            <ShopPagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <CustomProductSectionSkeleton />
        )}
      </div>
    </div>
  );
};


export default FreeDelivery;
