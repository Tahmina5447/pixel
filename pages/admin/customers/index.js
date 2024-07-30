import React, { useState } from "react";

import DashboardLayout from "../../../src/Components/DashboardLayout";
import AllUsers from "../../../src/Components/ManageUsers/AllUsers/AllUsers";

const Customers = () => {
  return (
    <DashboardLayout>
      <AllUsers />
    </DashboardLayout>
  );
};

export default Customers;
