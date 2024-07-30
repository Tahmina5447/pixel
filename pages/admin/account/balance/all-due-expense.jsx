import React from "react";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";
import AllExpense from "../../../../src/Components/Admin/Acount/TodaysExpense/AllExpense";
import DashboardLayout from "../../../../src/Components/DashboardLayout";

const ALLDueExpense = () => {
  return (
    <>
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"All Due Expenses"}
        />
        <div>
            <AllExpense type={"unpaid"}/>
        </div>
      </div>
    </DashboardLayout>
    </>
  );
};

export default ALLDueExpense;
