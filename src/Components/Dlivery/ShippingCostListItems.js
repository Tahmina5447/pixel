import React from "react";
import { useState } from "react";
import server_url from "../../../lib/config";
import { deleteMethodHook } from "../../../lib/deleteMethodHook";
import CustomModal from "../../Shared/CustomModal";
import EditDelivery from "./EditDelivery";

const ShippingCostListItems = ({ shippingItem, index, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editShippingData, setEditShippingData] = useState({});

  const handleDelteShippingCost = (id) => {
    const url = `${server_url}/delivery-cost/${id}`;
    deleteMethodHook(url, refetch);
  };

  const handleEditShippingCost = (data) => {
    setIsOpen(true);
    setEditShippingData(data);
  };

  return (
    <>
      {" "}
      <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
        <td className="p-3">
          <p>{index + 1}</p>
        </td>
        <td className="p-3">
          <p>{shippingItem?.city}</p>
        </td>
        <td className="p-3">
          <p>{shippingItem?.cost}</p>
        </td>
        <td className="p-3 text-right">
          <span
            onClick={() => handleEditShippingCost(shippingItem)}
            className="px-3 py-1 font-semibold rounded-md bg-emerald-600 text-gray-50 cursor-pointer"
          >
            <span>Edit</span>
          </span>
          <span
            onClick={() => handleDelteShippingCost(shippingItem._id)}
            className="px-3 ml-2 py-1 font-semibold rounded-md bg-red-600 text-gray-50 cursor-pointer"
          >
            <span>Delete</span>
          </span>
        </td>
      </tr>
      <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <EditDelivery refetch={refetch} editShippingData={editShippingData} />
      </CustomModal>
    </>
  );
};

export default ShippingCostListItems;
