import React from "react";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { Tooltip } from "react-tooltip";

const InvoiceTableItemRow = ({ product, index }) => {
  const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState(false)
  return (
    <>
      <Tooltip anchorSelect="#order-details">
        View Details
      </Tooltip>
      <tr id="order-details" onClick={() => setOpenOrderDetailsModal(true)} className="border-b cursor-pointer border-opacity-20 text-base font-bold border-gray-300 bg-gray-50">
        <td className="p-3">
          <p>{index + 1}</p>
        </td>
        <td className="p-3">
          <p>{product?.name}</p>
        </td>
        <td className="p-3">
          <p>{product?.quantity}</p>
          {product?.size && <p>Size: {product?.size}</p>}
          {product?.color && <p>Color: {product?.color}</p>}
          {/* {product?.color && (
            <p className="flex items-center gap-1">
              Color:
              <span
                className="w-4 h-4 rounded-sm inline-block"
                style={{ background: product?.color }}
              ></span>
            </p>
          )} */}
        </td>
        <td className="p-3">
          <p>৳{product?.price}.00</p>
        </td>
        
      </tr>
      <OrderDetailsModal
        setOpenOrderDetailsModal={setOpenOrderDetailsModal}
        openOrderDetailsModal={openOrderDetailsModal}
        product={product}
      />
    </>
  );
};

export default InvoiceTableItemRow;
