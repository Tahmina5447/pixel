import React, { useState } from "react";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";
import ExpenseIncomeAdd from "../../../../src/Components/Admin/Acount/Category/ExpenseIncomeAdd";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import { server_url_v2 } from "../../../../lib/config";
import { useQuery } from "react-query";
import { geBalanceHistory } from "../../../../lib/helper";
import Link from "next/link";
import { Icon } from "@iconify/react";
import EncomeTableData from "../../../../src/Components/Admin/Acount/TodaysExpense/EncomeTableData";

const AddIncome = () => {
  const [show, setShow] = useState();

  // let url = `${server_url_v2}/accounts/account-history?sort=-createdAt&type=income`;
  // const { data, isLoading, refetch } = useQuery(["Balance-History"], () => {
  //   return geBalanceHistory(url);
  // });

  // data?.data?.Accounts;

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb title={"Add Income"} />
        <div className=" px-7 py-1 bg-white mt-5 rounded shadow-sm">
          <ExpenseIncomeAdd
            setShow={setShow}
            type={"income"}
            page={true}
            overRefetch={()=>{}}
            accountRefetch={() => {}}
          />
        </div>
        {/* <div className="mt-10 mb-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-slate-600 uppercase">
              Last 5 Income
            </h2>
              <Link
                href={"/admin/account/balance/all-income"}
                className="flex items-center gap-1 bg-primary hover:bg-green-700 text-white px-2 rounded-full"
              >
                See all <Icon icon="bi:arrow-right" />
              </Link>
          </div>
          <div className="container mx-auto">
            <div className="overflow-x-auto rounded-md  bg-white shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="divide-gray-200 ">
                  <tr className="text-left uppercase font-extrabold">
                    <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Account
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div className=" flex items-center justify-center w-full">
                      <LoadingComponets />{" "}
                    </div>
                  ) : data?.data?.Accounts?.length > 0 ? (
                    data?.data?.Accounts?.slice(0, 5).map((item, index) => (
                      <EncomeTableData
                        item={item}
                        key={index}
                      />
                    ))
                  ) : (
                    <p className="px-3 py-2">Data is empty</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </DashboardLayout>
  );
};

export default AddIncome;
