import React, { useState } from "react";
import DashboardCardDesign from "../../../src/Shared/Dashboard/DashboardOverview/DashboardCardDesign";
import { MdFindInPage } from "react-icons/md";
import { useQuery } from "react-query";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  getDashboardOverview,
  getDashboardProfitOverview,
  getOrderList,
  getTodayOrderOverview,
} from "../../../lib/helper";
import dynamic from "next/dynamic";
import { convertTimestamp2 } from "../../../lib/convertTimestampDateAndTime";
import { useEffect } from "react";

const BestCategroySellChart = dynamic(
  () => import("../../../src/Components/Admin/Chart/OrderPieChart"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const DashboardLayout = dynamic(
  () => import("../../../src/Components/DashboardLayout"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const BestSellProductTable = dynamic(
  () => import("../../../src/Components/Dashboard/BestSellProductTable"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const OrderChart = dynamic(
  () => import("../../../src/Components/Admin/Chart/OrderChart"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const DasboardOrderTable = dynamic(
  () => import("../../../src/Components/User/DasboardOrderTable"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const DashboardOverview = () => {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [queryFilter, setQueryFilter] = useState("");
  
  
  const { data, isLoading, refetch } = useQuery(
    ["dashboard-overview-d", queryFilter],
    () => {
      return getDashboardOverview(queryFilter);
    }
  );
  const {
    data: profit,
    isLoading: profitLoading,
    refetch: profitRefetch,
  } = useQuery(["profit", queryFilter], () => {
    return getDashboardProfitOverview(queryFilter);
  });
  const {
    data: today,
    isLoading: todayLoading,
    refetch: todayReFetch,
  } = useQuery(["today"], getTodayOrderOverview);

  // console.log(profit?.data?.totalProfit);

  /* {
    "status": "success",
    "data": {
        "todayOrderItems": 1,
        "totalTodayOrderAmount": 899
    }
} */

  const dashboard = [
    {
      color: "bg-red-900",
      value: `${today?.data?.totalTodayOrderAmount}Tk.`,
      subTitle: `Total ${today?.data?.todayOrderItems} Orders`,
      title: "Today Order",
    },
    {
      color: "bg-blue-700",
      value: `${data?.data?.totalOrderAmount?.totalAmount}Tk.`,
      title: "Total Order Amount",
      subTitle: `Total ${data?.data?.totalOrderAmount?.totalOrders} Orders.`,
    },

    {
      color: "bg-orange-700",
      value: `${data?.data?.totalOrderAmount?.totalShippingPrice}Tk.`,
      title: "Total Shipping Price",
    },
    {
      color: "bg-green-700",
      value: `${profit?.data?.totalProfit}Tk.`,
      title: "Profit (after delivery)",
      subTitle: "Excluded discount and shipping cost",
    },

    {
      color: "bg-lime-700",
      value: `${data?.data?.totalOrderAmount?.pendingOrdersTotalAmount}Tk.`,
      subTitle: `Total ${data?.data?.totalOrderAmount?.pendingOrders} Orders.`,
      title: "Total Pending Order",
    },
    {
      color: "bg-pink-700",
      value: `${data?.data?.totalOrderAmount?.processingOrdersTotalAmount}Tk.`,
      subTitle: `total ${data?.data?.totalOrderAmount?.processingOrders} Orders.`,
      title: "Total Processing Order",
    },
    {
      color: "bg-indigo-700",
      value: `${data?.data?.totalOrderAmount?.deliveredOrdersTotalAmount}Tk.`,
      subTitle: `total ${data?.data?.totalOrderAmount?.deliveredOrders} Orders.`,
      title: "Total Delivered Order",
    },
    {
      color: "bg-red-600",
      value: `${data?.data?.totalOrderAmount?.cancelledOrdersTotalAmount}Tk.`,
      subTitle: `total ${data?.data?.totalOrderAmount?.cancelledOrders} Orders.`,
      title: "Total Cancelled Orders",
    },
  ];

  useEffect(() => {
    if (startDate === null) {
      setQueryFilter('');
    } else if (startDate && endDate) {
      const formattedStartDate = convertTimestamp2(startDate);
      const formattedEndDates = convertTimestamp2(endDate);
      setQueryFilter(`startDate=${formattedStartDate}&endDate=${formattedEndDates}`);
      refetch(["dashboard-overview", formattedStartDate, formattedEndDates]);
    }
  }, [startDate, endDate, refetch]);

  // const handleOrderDateFilter = () => {
  //   if (!startDate || !endDate) {
  //     return alert("please select date");
  //   }

  //   if (new Date(startDate) > new Date(endDate)) {
  //     return alert("invalid date input");
  //   }
  //   setQueryFilter(`startDate=${startDate}&endDate=${endDate}`);
  //   refetch(["dashboard-overview", startDate, endDate]);
  // };


  // console.log("hello datesssss------------------", formattedDate, formattedDates)
  return (
    <DashboardLayout>
      <section className="mt-8 mb-16">
        <div className="sm:flex items-center gap-4 justify-between mb-5 bg-white shadow-md p-2 md:px-4 rounded-md">
          <h3 className="text-xl md:text-2xl font-bold uppercase my-2 md:my-6 font-serif text-center md:text-start">
            Dashboard Overview
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
          {/* <div className="grid grid-cols-1 md:flex gap-2 justify-end items-center p-2 flex-wrap "> */}


          {/* <div className="">
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type={'date'}
                className="input input-bordered w-full "
                placeholder="MM/DD/YYYY"
              />
            </div>
            <span className="hidden md:block"> to</span>
            <div className="">
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type='date'
                placeholder="MM/DD/YYYY"
                className="input input-bordered w-full"
              />
            </div>
            <span
              onClick={handleOrderDateFilter}
              className="btn btn-primary  md:btn-square btn-md text-white hover:btn-info"
            >
              <Icon
                icon="fa:search"
                className=" text-white text-lg text-[24px] "
              />
              <span className="md:hidden block">Search</span>
            </span> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 flex-wrap">
          {dashboard.map((dash, index) => (
            <DashboardCardDesign
              key={index}
              customStyle={{
                topBg: "hsl(195, 74%, 62%)",
                mainBg: dash.color,
              }}
              title={dash.title}
              value={dash.value}
              subTitle={dash?.subTitle}
            />
          ))}
        </div>
        {/* recent order and best sell products */}
        {/*  <div className=" my-8 ">
          <OrderChart />
        </div> */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-2 xl:gap-6 my-8 items-start ">
          <div className="col-span-5 xl:col-span-3 h-full ">
            <OrderChart />
          </div>
          <div className="col-span-5 xl:col-span-2 h-full">
            <BestCategroySellChart />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-0 xl:gap-6 my-8  ">
          <div className="col-span-5 xl:col-span-3 ">
            <DasboardOrderTable
              style={{ mx: "mx-0", my: "my-2" }}
              dataRight="admin"
            />
          </div>
          <div className="col-span-5 xl:col-span-2">
            <BestSellProductTable />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardOverview;
