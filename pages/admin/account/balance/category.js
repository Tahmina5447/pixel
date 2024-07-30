import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { useState } from "react";
import { getBalanceCategory } from "../../../../lib/helper";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import CategoryCard from "../../../../src/Components/Admin/Acount/Category/CategoryCard";
import Link from "next/link";
import { useFetchVersionTwo } from "../../../../src/hooks/usePublicFetchVersionTwo";
import ExpenseIncomeReturn from "../../../../src/Components/Admin/Acount/Category/ExpenseIncomeReturn";
import CustomPagination from "../../../../src/Shared/CustomPagination";
import CategoryTableData from "../../../../src/Components/Admin/Acount/TodaysExpense/CategoryTableData";
import CustomModal from "../../../../src/Shared/CustomModal";
import AddCategoryModal from "../../../../src/Components/Admin/Acount/Category/AddCategoryModal";
import { FaPlusSquare } from "react-icons/fa";
import { server_url_v2 } from "../../../../lib/config";
const category = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [queryFilter, setQueryFilter] = useState("");
  const [searchCategory, setSearchCategory] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [fetchQuery, setFetchQuery] = useState("expense-category");

  const {
    data: categories,
    isLoading,
    refetch,
  } = useFetchVersionTwo([fetchQuery], fetchQuery);

  const handleSearch = (value) => {
    let query = `expense-category?search=${value}`
    setFetchQuery(query)
  }

  const allCategories = categories?.data?.result?.result;



  /*  const { data: allHistory, isLoading: historyLoading } = useQuery(
     ["Balance-History", item._id, queryFilter],
     () => {
       return geBalanceHistory(url, queryFilter);
     }
   );
 
  */
  // const handleDateFilter = () => {
  //     if (!startDate || !endDate) {
  //         return alert("please select date");
  //     }

  //     if (new Date(startDate) > new Date(endDate)) {
  //         return alert("invalid date input");
  //     }
  //     setQueryFilter(`&startDate=${startDate}&endDate=${endDate}`);
  //     // refetch(["Balance-History", startDate, endDate]);
  // };

  // const clearData = () => {
  //     // setQueryFilter("")
  //     setEndDate(0)
  //     setStartDate(0)
  //     setSearchCategory("")
  // }

  return (
    <>
      <DashboardLayout>
        <section className="mt-8 mb-16">
          <div className="lg:flex items-center justify-between mb-5 bg-white shadow-md p-2 md:px-4 rounded-md gap-2">
            <h3 className="text-center text-lg md:text-lg font-bold uppercase my-2 md:my-6 font-sans">
              Expenses & Income Category
            </h3>
          </div>

          <div className="lg:flex items-center justify-between mb-5 bg-white shadow-md p-4 md:px-4 rounded-md gap-2">
            <button
              onClick={() => setAddCategoryModalOpen(true)}
              className=" flex items-center gap-2 py-2 px-3 bg-primary text-white rounded-md"
            >
              <FaPlusSquare size={20} /> Add Category
            </button>
            <div className=" flex items-center justify-end">
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="input"
                placeholder="Search ..."
                className="input input-bordered "
              />
            </div>
          </div>

          {/* ==== Account category Card==== */}
          {/* <div className="mt-5 bg-white rounded-md p-5 shadow-md">
            {!isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {allCategories?.length ? (
                  allCategories
                    ?.slice(0, 3)
                    .map((category, index) => (
                      <CategoryCard
                        category={category}
                        key={index}
                        refetch={refetch}
                      />
                    ))
                ) : (
                  <div className=" drop-shadow-sm py-4 bg-gray-100 rounded-lg px-5 text-center">
                    <h2 className=" text-[18px] font-extrabold">
                      Category Not Found!{" "}
                    </h2>
                  </div>
                )}
              </div>
            ) : (
              <LoadingComponets />
            )}
            <div>
              {allCategories?.length > 3 && (
                <div className=" flex items-center justify-center mt-4">
                  <Link
                    href={"/admin/account/balance/allIERcategory"}
                    className="py-2 px-3 text-primary font-bold  flex items-center"
                  >
                    See More <Icon icon="basil:arrow-right-solid" />
                  </Link>
                </div>
              )}
            </div>
          </div> */}

          <div className="container mx-auto mt-5">
            <div className="overflow-x-auto rounded-md  bg-white shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="divide-gray-200 ">
                  <tr className="text-left uppercase font-extrabold">
                    <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      S/L
                    </th>
                    <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Expenses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Income
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
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
                      <CategoryTableData
                        item={item}
                        key={index}
                        refetch={refetch}
                        totalExpanseIncome={categories?.data?.categoryTotals}
                        index={index}
                      />
                    ))
                  ) : (
                    <p className="px-3 py-2">Data is empty</p>
                  )}
                </tbody>
              </table>
            </div>
            <CustomPagination
              arrayData={allCategories}
              setCurrentItems={setCurrentItems}
              itemsPerPage={15}
            />
          </div>

          {/* </div> */}
          {/* <ExpenseIncomeReturn
            allCategories={allCategories}
            refetch={refetch}
          /> */}

          <CustomModal
            modalIsOpen={addCategoryModalOpen}
            setIsOpen={setAddCategoryModalOpen}
          >
            <AddCategoryModal
              setAddCategoryModalOpen={setAddCategoryModalOpen}
              refetch={refetch}
            />
          </CustomModal>
        </section>
      </DashboardLayout>
    </>
  );
};

export default category;
