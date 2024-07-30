import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import { server_url_v4 } from "../../../lib/config";
import { useQuery } from "react-query";
import CartTableItem from "../../../src/Shared/TableItem/CartTableItem";
import CustomPagination from "../../../src/Shared/CustomPagination";
import { convertTimestamp2 } from "../../../lib/convertTimestampDateAndTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDashboardCart } from "../../../lib/helper";

const Cart = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [queryFilter, setQueryFilter] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  //-------------------its reloader use for when we delete or update and set !reolder, then depenciy reloded

  let categoryUrl = `${server_url_v4}/cart/all-cart`;

  const { data, isLoading, isError, refetch } = useQuery(
    ["reviewData",queryFilter], ()=>getDashboardCart(queryFilter));

  const reviews = data?.data;

  useEffect(() => {
    if (startDate === null) {
      setQueryFilter("");
      refetch();
    } else if (startDate && endDate) {
      const formattedStartDate = convertTimestamp2(startDate);
      const formattedEndDates = convertTimestamp2(endDate);
      setQueryFilter(
        `startDate=${formattedStartDate}&endDate=${formattedEndDates}`
      );
      refetch();
    }
  }, [startDate, endDate, refetch]);



  return (
    <DashboardLayout>
      <div className=" mt-10">
        <div className="sm:flex items-center gap-4 justify-between mb-5 bg-white shadow-md p-2 md:px-4 rounded-md">
          <h3 className="text-xl md:text-2xl font-bold  my-2 md:my-6 text-center md:text-start">
            Customer Cart
          </h3>
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
              className="w-[240px] border border-gray-500 rounded-md pl-2 pr-8 py-1 "
            />
          </div>
        </div>
        {/* -----------------------bellow table------------------------- */}
        <div className="mt-6 bg-white rounded-lg pb-2 shadow-md">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="bg-[#f3f3f3] text-center">ID</th>
                  <th className="bg-[#f3f3f3] text-center">Phone Number</th>
                  <th className="bg-[#f3f3f3] text-center">Date</th>
                  <th className="bg-[#f3f3f3] text-center">Cart Item</th>
                  <th className="bg-[#f3f3f3] text-center">View</th>
                  <th className="bg-[#f3f3f3] text-center">Actions</th>
                </tr>
              </thead>
              {currentItems?.map((category, index) => (
                <CartTableItem
                  key={category?._id}
                  category={category}
                  index={index}
                  refetch={refetch}
                ></CartTableItem>
              ))}
            </table>
            <CustomPagination
              arrayData={reviews}
              setCurrentItems={setCurrentItems}
              itemsPerPage={10}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cart;
