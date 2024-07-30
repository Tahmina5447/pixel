import React, { useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import ShippingCostForm from "../../../src/Components/Dlivery/AddDelivery";
import server_url from "../../../lib/config";
import { useQuery } from "react-query";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";
import swal from "sweetalert";
const fetchDeliveryCost = async () => {
  const response = await fetch(`${server_url}/delivery-cost`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};



const DeliveryIndex = () => {
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useQuery('deliveryCost', fetchDeliveryCost);



  const handleAddOrUpdateShippingCost = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/delivery-cost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Data inserted/updated successfully:', result);
        swal("success", "Shipping Setting data save successfully!", "success")
      } else {
        console.error('Failed to insert/update data:', result);
        swal("error", 'Failed to insert/update data.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Shipping Setting"} />
      <div className="my-8">
        <div>
          <ShippingCostForm
            defaultValues={data?.data?.result[0]}
            handleAddOrUpdateShippingCost={handleAddOrUpdateShippingCost}
            loading={loading}
          />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryIndex;
