import React from "react";
import OthersCityShippingCost from "./OthersCityShippingCost";

import ShippingCostListItems from "./ShippingCostListItems";

const ShowDailvery = ({ shipping, refetch }) => {
  return (
    <div className=" my-3 text-gray-800 block md:flex gap-5">
      <div className="p-6 rounded-md shadow-sm bg-gray-100">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Shipping Cost List
        </h2>
        <div className="overflow-x-auto">
          <table className="max-w-full text-xs">
            <thead className="bg-gray-300">
              <tr className="text-left">
                <th className="p-3">SN</th>
                <th className="p-3">City</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {shipping?.data?.result?.map((shippingItem, index) => (
                <ShippingCostListItems
                  key={shippingItem?._id}
                  shippingItem={shippingItem}
                  refetch={refetch}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OthersCityShippingCost />
    </div>
  );
};

export default ShowDailvery;
