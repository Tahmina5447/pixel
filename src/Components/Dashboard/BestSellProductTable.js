import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProductWithQuery } from "../../../lib/helper";
import DashboardOrderTableRow from "../User/DashboardOrderTableRow";
import BestSellProductTableRow from "./BestSellProductTableRow";

const BestSellProductTable = () => {
  const [queryFilter, setQueryFilter] = useState("sort=-saleCount");

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilter],
    () => {
      if (queryFilter) {
        return getProductWithQuery(queryFilter);
      }
    }
  );

  return (
    <>
      <div
        className={`my-8 md:my-16 py-5 px-2 rounded-md mx-2 md:mx-0 bg-white shadow-md `}
      >
        <div className="container p-2 mx-auto sm:p-4 text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight uppercase">
            Best Sell Products
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">S/N</th>
                  <th className="p-3">NAME</th>
                  <th className="p-3">SALE PRICE</th>
                  <th className="p-3">SALE COUNT</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.data?.products
                    .slice(0, 5)
                    .map((item, index) => (
                      <BestSellProductTableRow
                        key={item._id}
                        product={item}
                        index={index}
                      />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellProductTable;
