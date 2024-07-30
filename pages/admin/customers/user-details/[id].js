import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getOrderList } from "../../../../lib/helper";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";

import DashboardOrderTableRow from "../../../../src/Components/User/DashboardOrderTableRow";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, refetch } = useQuery(["orderList", id], () => {
    if (id) {
      return getOrderList(`user=${id}`);
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingComponets />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div>
        <section className="bg-white">
          <div>
            <AdminDashboardBreadcrumb
              title={"Customer Order List "}
              subtitle={""}
            />
          </div>
          <main aria-label="Main" className="px-2 pb-8 sm:px-7">
            {data?.data?.total > 0 && (
              <div className="">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead className="bg-gray-300">
                      <tr className="text-left">
                        <th className="p-3">INVOICE</th>
                        <th className="p-3">ORDERTIME</th>
                        <th className="p-3">METHOD</th>
                        <th className="p-3">STATUS</th>
                        <th className="p-3 ">TOTAL</th>
                        <th className="p-3 ">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.data?.result.map((item) => (
                          <DashboardOrderTableRow
                            key={item._id}
                            order={item}
                            dataRight={"admin"}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {data?.data?.total < 1 && (
              <div className="w-full flex justify-center items-center h-[50vh]">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 mb-2 text-primary mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h2 className="font-bold">
                    This Customer have no order Yet!
                  </h2>
                </div>
              </div>
            )}
          </main>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
