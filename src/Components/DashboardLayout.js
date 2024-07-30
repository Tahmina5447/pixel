import React from "react";

import dynamic from "next/dynamic";
import { useUserData } from "../hooks/useMyShopData";
import LoadingComponets from "../Shared/LoadingComponets";

const AdminDashboardSidebar = dynamic(
  () => import("./Admin/AdminDashboardSidebar/AdminDashboardSidebar"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // Exclude from server-side rendering
  }
);

const RequireAuthAdmin = dynamic(() => import("../RequireAuth/RequireAdmin"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Exclude from server-side rendering
});

const DashboardLayout = ({ children }) => {
  const { user } = useUserData();

  return (
    <RequireAuthAdmin>
      {user?.data?.role === "admin" ? (
        <div className="drawer drawer-mobile bg-[#F9FAFB]">
          <input
            id="dashboard-drawer-toggle"
            type="checkbox"
            className="drawer-toggle"
          />

          <div className="drawer-content pl-2 pr-2 md:pl-5 md:pr-3 pb-20">
            {children}
          </div>
          {/* ------------------------------------------- */}
          <div className="drawer-side ">
            <label
              htmlFor="dashboard-drawer-toggle"
              className="drawer-overlay"
            ></label>
            <AdminDashboardSidebar />
          </div>
          {/* ------------------------------------------- */}
        </div>
      ) : (
        <LoadingComponets />
      )}
    </RequireAuthAdmin>
  );
};

export default DashboardLayout;
