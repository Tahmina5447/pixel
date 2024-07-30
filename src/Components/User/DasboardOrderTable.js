import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import AuthUser from "../../../lib/AuthUser";
import { getOrderList } from "../../../lib/helper";
import DashboardOrderTableRow from "./DashboardOrderTableRow";
const DasboardOrderTable = ({ style = { my: "my-8" }, dataRight }) => {
  const { userInfo } = AuthUser();
  const [queryFilter, setQueryFilter] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["user-order-list", queryFilter],
    () => {
      if (queryFilter) {
        return getOrderList(queryFilter);
      }
    }
  );

  useEffect(() => {
    if (dataRight === "user") {
      setQueryFilter(`user=${userInfo?._id}`);
      refetch(["user-order-list", queryFilter]);
    }
    if (dataRight === "admin") {
      setQueryFilter(`search`);
      refetch(["user-order-list", queryFilter]);
    }
  }, [userInfo, dataRight]);

  return (
    <>
      <div
        className={`${style.my} xl:my-16 py-5 px-2 rounded-md mx-2 md:${style.mx} bg-white shadow-md `}
      >
        <div className="container p-2 mx-auto sm:p-4 text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight uppercase">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">INVOICE</th>
                  <th className="p-3">ORDER TIME</th>
                  <th className="p-3">METHOD</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 ">TOTAL</th>
                  <th className="p-3 ">VIEW</th>
                  {/* <th className="p-3 ">ACTION</th> */}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.data?.result
                    .slice(0, 6)
                    .map((item) => (
                      <DashboardOrderTableRow
                        key={item._id}
                        order={item}
                        dataRight={dataRight}
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

export default DasboardOrderTable;
