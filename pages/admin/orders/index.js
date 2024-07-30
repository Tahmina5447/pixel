import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { getOrderList } from "../../../lib/helper";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import { Icon } from "@iconify/react";
import ExportOrder from "../../../src/Components/Admin/ExportImport/ExportOrders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertTimestamp2 } from "../../../lib/convertTimestampDateAndTime";

const OrdersTableItem = dynamic(
  () => import("../../../src/Shared/TableItem/TableItemOrders"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const CustomModal = dynamic(() => import("../../../src/Shared/CustomModal"), {
  loading: () => <p>Loading...</p>,
});
const CustomPagination = dynamic(
  () => import("../../../src/Shared/CustomPagination"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const InoviceOrderForUser = dynamic(
  () => import("../../../src/Shared/Invoice/InoviceOrderForUser"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Orders = () => {
  const [queryFilter, setQueryFilter] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [orderModalData, setOrderModalData] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // const [startDateInputType, setStartDateInputType] = useState('text');
  // const [endDateInputType, setEndDateInputType] = useState('text');

  const { data, isLoading, refetch } = useQuery(
    ["user-order-list", queryFilter],
    () => {
      return getOrderList(queryFilter);
    }
  );
  const handleInvoiceModal = (order) => {
    setIsOpen(true);
    setOrderModalData(order);
  };


  const handleSearchFilter = (e) => {
    const value = e.target.value;
    setQueryFilter(`search=${value}`);
    refetch(["user-order-list", value]);
  };
  const handleStatusFilter = (e) => {
    const value = e.target.value;
    if (!value) {
      setQueryFilter(``);
      return refetch(["user-order-list"]);
    }
    setQueryFilter(`status=${value}`);
    refetch(["user-order-list", value]);
  };

  const formattedStartDate = convertTimestamp2(startDate);
  const formattedEndDate = convertTimestamp2(endDate);
  useEffect(() => {
    if (startDate === null) {
      setQueryFilter('');
    } else if (formattedStartDate && formattedEndDate) {
      setQueryFilter(`startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      refetch(["user-order-list", formattedStartDate, formattedEndDate]);
    }
  }, [startDate, endDate, refetch]);



  const handleOrderDownloadOrder = () => {
    if (!startDate || !endDate) {
      return alert("please select date");
    }

    if (new Date(startDate) > new Date(endDate)) {
      return alert("invalid date input");
    }
    setQueryFilter(`startDate=${startDate}&endDate=${endDate}`);
  };




  return (
    <DashboardLayout>
      <div className="">
        <h1 className="font-semibold mt-5 mb-2 text-xl">Orders</h1>

        <div className="p-8 rounded bg-white shadow flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
          <div className=" w-full md:w-[25%]">
            <input
              type="text"
              onChange={handleSearchFilter}
              className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
              placeholder="Search by Phone"
            />
          </div>
          <div className="w-full md:w-[25%]">
            <select
              onChange={handleStatusFilter}
              className="select w-full select-bordered "
            >
              <option disabled selected hidden>
                Status
              </option>
              <option value={""}>All</option>
              <option value={"pending"}>Pending</option>
              <option value={"processing"}>Processing</option>
              <option value={"invoiced"}>Invoiced</option>
              <option value={"delivered"}>Delivered</option>
              <option value={"cancelled"}>Cancelled</option>
            </select>
          </div>


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
          
            {startDate && endDate && (
              <ExportOrder startDate={formattedStartDate} endDate={formattedEndDate} />
            )}
        </div>
        {/* -----------------------bellow table------------------------- */}
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="bg-[#f3f3f3] text-center">ID & Date</th>
                  {/* <th className="bg-[#f3f3f3] text-center">DATE & time</th> */}
                  <th className="bg-[#f3f3f3] text-center">Name</th>
                  <th className="bg-[#f3f3f3] text-center">SHIPPING ADDRESS</th>
                  <th className="bg-[#f3f3f3] text-center">PHONE</th>
                  <th className="bg-[#f3f3f3] text-center">METHOD</th>
                  <th className="bg-[#f3f3f3] text-center">AMOUNT</th>
                  <th className="bg-[#f3f3f3] text-center">ACTION</th>
                  <th className="bg-[#f3f3f3] text-center">Courier</th>
                  <th className="bg-[#f3f3f3] text-center">STATUS</th>
                  <th className="bg-[#f3f3f3] text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item) => (
                  <OrdersTableItem
                    key={item?._id}
                    order={item}
                    refetch={refetch}
                    handleInvoiceModal={handleInvoiceModal}
                  ></OrdersTableItem>
                ))}
              </tbody>
            </table>
            <CustomPagination
              arrayData={data?.data?.result}
              setCurrentItems={setCurrentItems}
              itemsPerPage={10}
            />
          </div>
        </div>
        <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          {/* -----------this modal for when user placed order then open modal for payment and there have 4 type payment system */}
          {modalIsOpen && (
            <InoviceOrderForUser dataRight="admin" order={orderModalData} />
          )}
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
