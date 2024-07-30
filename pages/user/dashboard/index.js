import React from "react";
import UserDashLayout from "../../../src/Components/userDashLayout";
import { MdLocalShipping, MdOutlineDone, MdPending } from "react-icons/md";
import { useQuery } from "react-query";
import { getUserDashboardInfo } from "../../../lib/helper";
import AuthUser from "../../../lib/AuthUser";
import DasboardOrderTable from "../../../src/Components/User/DasboardOrderTable";
const UserDashboard = () => {
  const { userInfo } = AuthUser();

  const {
    data: dashboard,
    isLoading,
    refetch,
  } = useQuery(["user-dashboard"], () => {
    if (userInfo._id) {
      return getUserDashboardInfo(userInfo._id);
    }
  });

  return (
    <UserDashLayout>
      <div className="my-8 md:my-16 mx-2 ">
        <h2 className="text-3xl font-bold mx-6 uppercase ">Dashboard</h2>
        <section className="p-6 my-6 mx-6 bg-gray-100  rounded-md text-gray-800">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6  shadow-md bg-white text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-red-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 text-red-500"
                >
                  <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                  <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                  <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle ">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.totalOrders}
                </p>
                <p className="capitalize">Total Order</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-orange-200">
                <MdPending size={35} className="text-orange-500" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.pendingOrders}
                </p>
                <p className="capitalize">Pending Order</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-blue-200">
                <MdLocalShipping size={35} className="text-blue-500" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.processingOrders}
                </p>
                <p className="capitalize">Processing Order</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-md text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-emerald-200">
                <MdOutlineDone size={35} className="text-emerald-500" />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {dashboard?.data?.completeOrders}
                </p>
                <p className="capitalize">Complete Order</p>
              </div>
            </div>
          </div>
        </section>

        <DasboardOrderTable style={{ mx: "mx-6" }} dataRight="user" />
      </div>
    </UserDashLayout>
  );
};

export default UserDashboard;
