import React from "react";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import { server_url_v2 } from "../../../../lib/config";
import { useQuery } from "react-query";
import { geBalanceHistory } from "../../../../lib/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import CustomPagination from "../../../../src/Shared/CustomPagination";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import ExpenseIncomeTableData from "../../../../src/Components/Admin/Acount/TodaysExpense/ExpenseIncomeTableData";
import { convertTimestamp2 } from "../../../../lib/convertTimestampDateAndTime";
import { useEffect } from "react";
import ReturnTableData from "../../../../src/Components/Admin/Acount/TodaysExpense/ReturnTableData";

const ALLRETURN = () => {
  const [queryFilter, setQueryFilter] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [search, setSearch] = useState(null);
  const [activeType, setACtiveType] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  let url = `${server_url_v2}/accounts/account-history?sort=-createdAt&type=return`;
  useEffect(() => {
    if (search) {
        url = `${server_url_v2}/accounts/account-history?sort=-createdAt&type=return&search=${search}`
    }
}, [search])
  const { data, isLoading, refetch } = useQuery(["Balance-History",search,queryFilter], () => {
    return geBalanceHistory(url,queryFilter);
  });

  const formattedStartDate = convertTimestamp2(startDate);
  const formattedEndDate = convertTimestamp2(endDate);
  useEffect(() => {
      if (startDate === null) {
          setQueryFilter('');
      } else if (formattedStartDate && formattedEndDate) {
          setQueryFilter(`&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
          refetch(["Balance-History", formattedStartDate, formattedEndDate]);
      }
  }, [startDate, endDate, refetch]);

  // const handleSelectedType = (event) => {
  //   setACtiveType(event.target.value);
  //   if(event.target.value==="all"){
  //     setQueryFilter("")
  //   }else{
  //     setQueryFilter(`&type=${event.target.value}`);
  //   }
  // };

  const clearData = () => {
    setQueryFilter("")
    setSearch("")
}

  return (
    <>
      <DashboardLayout>
        <div className="mid-container">
          <AdminDashboardBreadcrumb title={"All Return"} />
          <div>
            <div className=" bg-white py-5 px-5 mt-5 rounded-md shadow">
              <div className="flex items-center md:gap-5 gap-2 md:flex-row  flex-col justify-between">
                <div className=" w-full">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="input"
                    placeholder="Search name..."
                    className="input input-bordered w-full "
                  />
                </div>
                {/* <div className=" bg-white border px-[5px] py-[11px] rounded-lg md:w-[350px] w-full ">
                  <select
                    onChange={handleSelectedType}
                    value={activeType}
                    className=" outline-none  w-full"
                    placeholder="Choose Your Account Name"
                  >
                    <option value={"all"}>All</option>
                    <option value={"expense"}>Expense</option>
                    <option value={"income"}>Income</option>
                  </select>
                </div> */}
                <div className="flex justify-center items-center mt-2 sm:mt-0">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    isClearable={true}
                    placeholderText="Filter By Date"
                    className="w-[240px] border border-gray-500 rounded-md pl-2 pr-8 py-2 "
                  />
                </div>
                {search ? (
                  <div>
                    <button
                      onClick={() => clearData()}
                      className="py-[11px] px-5 bg-red-500 text-white font-bold rounded-lg"
                    >
                      Clear
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* ========table data======= */}
            <div className="container mx-auto mt-5">
                    <div className="overflow-x-auto rounded-md  bg-white shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="divide-gray-200 ">
                                <tr className="text-left uppercase font-extrabold">
                                    <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isLoading ? <div className=' flex items-center justify-center w-full'><LoadingComponets /> </div> :
                                    currentItems?.length >0 ?  currentItems?.map((item, index) => (
                                      <ReturnTableData item={item} key={index}/>
                                    )): <p className='px-3 py-2'>Data is empty</p>
                                }
                            </tbody>
                        </table>
                    </div>
                    <CustomPagination
                        arrayData={data?.data?.Accounts}
                        setCurrentItems={setCurrentItems}
                        itemsPerPage={15}
                    />
                </div>

          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ALLRETURN;
