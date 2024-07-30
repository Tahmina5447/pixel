import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

const BDAutoCity = ({ shippingCost, setShippingCost }) => {
  

  const { data, isLoading, error } = useQuery("myData", async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/delivery-cost"
    );
    const data = await response.json();

    return data;
  });
  const deliveryCost = data?.data?.result[0];

  useEffect(() => {
    if (deliveryCost) {
      setShippingCost(Number(deliveryCost?.inDhaka) ? Number(deliveryCost?.inDhaka) : 120);
    }
  }, [deliveryCost]);

  return (
    <>
      {/* ---------------------------------------------------------- */}
      <div className="">
        <div className="w-full ">
        
          <div className=" border   text-black  w-full  p-1 flex items-center justify-between rounded cursor-pointer ">
            <select
              value={shippingCost}
              onChange={(event) => setShippingCost(event.target.value)}
              className="w-full text-black rounded py-2.5 px-3"
            >
              <option value={deliveryCost?.inDhaka}>
                Inside Dhaka City (ঢাকা সিটির ভিতর)
              </option>
              <option value={deliveryCost?.outDhaka}>
                Outside Dhaka City (সাভার, আশুলিয়া, কেরানিগঞ্জ)
              </option>
              <option value={deliveryCost?.others}>
                Others (অন্যান্য জেলা)
              </option>
            </select>
            
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------- */}
    </>
  );
};

export default BDAutoCity;
