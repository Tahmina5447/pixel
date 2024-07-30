import React from "react";
import BackButton from "./BackButton";

const AdminDashboardBreadcrumb = (props) => {
  return (
    <div className="p-7 bg-white mt-5 rounded shadow-sm">
      <div className="flex justify-start items-center gap-5">
        <BackButton />
        <div className=" flex items-center flex-wrap md:gap-2">
        <h1 className="md:text-2xl font-semibold">{props?.title}</h1>
        <h1 className="md:text-2xl font-semibold text-primary uppercase">{props?.title2}</h1>
        </div>
      </div>
      <p className="text-neutral">{props?.subtitle}</p>
    </div>
  );
};

export default AdminDashboardBreadcrumb;
