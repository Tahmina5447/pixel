import React, { useState } from "react";
import { useQuery } from "react-query";
import { getOrderList } from "../../../lib/helper";
import UserOrderTableRow from "../../../src/Components/User/UserOrderTableRow";
import UserDashLayout from "../../../src/Components/userDashLayout";
import CustomModal from "../../../src/Shared/CustomModal";
import InoviceOrderForUser from "../../../src/Shared/Invoice/InoviceOrderForUser";
import AuthUser from "../../../lib/AuthUser";
import { useEffect } from "react";
const MyOrderList = () => {
  const { userInfo } = AuthUser();
  const [queryFilter, setQueryFilter] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [orderModalData, setOrderModalData] = useState({});
  const { data, isLoading, refetch } = useQuery(
    ["user-order-list", userInfo?._id],
    () => {
      if (userInfo._id) {
        return getOrderList(`user=${userInfo._id}`);
      }
    }
  );
  const handleInvoiceModal = (order) => {
    setIsOpen(true);
    setOrderModalData(order);
  };

  /*   useEffect(() => {
    if (userInfo._id) {
      setQueryFilter(`user=63fcc5e01c622b18d6f1b620`);
      refetch(["user-order-list", userInfo._id]);
    }
  }, [userInfo]); */

  return (
    <UserDashLayout>
      <div className="my-8 md:my-16 py-5 px-3 rounded-md mx-2 md:mx-6 bg-white shadow-md">
        <div className="container p-2 mx-auto sm:p-4 text-gray-800">
          <h2 className="mb-4 text-2xl uppercase font-semibold leading-tight">
            My Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">INVOICE</th>
                  <th className="p-3">ORDERTIME</th>
                  <th className="p-3">METHOD</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 ">TOTAL</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.data?.result.map((item) => (
                    <UserOrderTableRow
                      handleInvoiceModal={handleInvoiceModal}
                      key={item._id}
                      order={item}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          {/* -----------this modal for when user placed order then open modal for payment and there have 4 type payment system */}
          <InoviceOrderForUser order={orderModalData} />
        </CustomModal>
      </div>
    </UserDashLayout>
  );
};

export default MyOrderList;
