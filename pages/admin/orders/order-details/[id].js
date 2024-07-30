import React from "react";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import { useRouter } from "next/router";
import { getOrderById } from "../../../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import UserProfileOfOrder from "../../../../src/Components/Admin/OrderDetails/UserProfileOfOrder";
import ContactInfoUserOfOrder from "../../../../src/Components/Admin/OrderDetails/ContactInfoUserOfOrder";
import OrderPaymentInfo from "../../../../src/Components/Admin/OrderDetails/OrderPaymentInfo";
import InvoiceTableItemRow from "../../../../src/Components/SuccessPayment/InvoiceTableItemRow";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, refetch } = useQuery(["order", id], () => {
    if (id) {
      return getOrderById(id);
    }
  });

  console.log(data)


  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingComponets />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Order Details"} />
      {data && (
        <div className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-md">
              <UserProfileOfOrder user={data?.data?.user} order={data.data} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              {data && (
                <ContactInfoUserOfOrder
                  order={data?.data}
                  status={data?.data?.status}
                  refetch={refetch}
                />
              )}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <OrderPaymentInfo orderInfo={data?.data} refetch={refetch} />
            </div>
          </div>
          {/* table here */}
          <div className="my-5 mx-auto  text-gray-800 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-extrabold my-3">Product List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">SR</th>
                    <th className="p-3">PRODUCT NAME</th>
                    <th className="p-3 uppercase">Variant</th>
                    <th className="p-3">QUANTITY</th>
                    <th className="p-3">PRICE</th>
                    <th className="p-3 ">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.orderItem?.map((item, index) => (
                    <InvoiceTableItemRow
                      key={index}
                      index={index}
                      product={item}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {
              data?.data?.shippingAddress?.note && <h2 className=" mt-3">Note : {data?.data?.shippingAddress?.note}</h2>
            }
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OrderDetailsPage;
