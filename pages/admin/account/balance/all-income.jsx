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
import EncomeTableData from "../../../../src/Components/Admin/Acount/TodaysExpense/EncomeTableData";
import CustomModal from "../../../../src/Shared/CustomModal";
import ExpenseIncomeAdd from "../../../../src/Components/Admin/Acount/Category/ExpenseIncomeAdd";
import { Icon } from "@iconify/react";

const ALLIncome = () => {
  const [queryFilter, setQueryFilter] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [search, setSearch] = useState(null);
  const [activeType, setACtiveType] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");

  let url = `${server_url_v2}/accounts/account-history?sort=-createdAt&type=income`;
  useEffect(() => {
    if (search) {
      url = `${server_url_v2}/accounts/account-history?sort=-createdAt&type=income&search=${search}`;
    }
  }, [search]);
  const { data, isLoading, refetch } = useQuery(
    ["Balance-History", search, queryFilter],
    () => {
      return geBalanceHistory(url, queryFilter);
    }
  );

  const formattedStartDate = convertTimestamp2(startDate);
  const formattedEndDate = convertTimestamp2(endDate);
  useEffect(() => {
    if (startDate === null) {
      setQueryFilter("");
    } else if (formattedStartDate && formattedEndDate) {
      setQueryFilter(
        `&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
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
    setQueryFilter("");
    setSearch("");
  };

  return (
    <>
      <DashboardLayout>
        <div className="mid-container">
          <AdminDashboardBreadcrumb title={"All Income"} />
          <div>
            <div className=" bg-white py-5 px-5 mt-5 rounded-md shadow">
              <div className="flex items-center md:gap-5 gap-2 md:flex-row  flex-col justify-between">
                <div>
                  <button
                    onClick={() => {
                      setShow(true);
                      setType("income");
                    }}
                    className=" hover:bg-green-600 duration-300 bg-green-500 w-[200px] py-3 rounded-lg justify-center text-white flex items-center gap-1"
                  >
                    <Icon icon="game-icons:profit" color="#fff" fontSize={17} />
                    Add New Income
                  </button>
                </div>
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
                    placeholderText="Filter Income By Date"
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
                    ) : currentItems?.length > 0 ? (
                      currentItems?.map((item, index) => (
                        <EncomeTableData item={item} key={index} />
                      ))
                    ) : (
                      <p className="px-3 py-2">Data is empty</p>
                    )}
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
      <CustomModal modalIsOpen={show} setIsOpen={setShow}>
        <ExpenseIncomeAdd
          setShow={setShow}
          type={type}
          overRefetch={() => {}}
          accountRefetch={refetch}
        />
      </CustomModal>
    </>
  );
};

export default ALLIncome;
