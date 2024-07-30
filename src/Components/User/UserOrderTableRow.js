import React from "react";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";

const UserOrderTableRow = ({ order, handleInvoiceModal }) => {
  const { date, time } = convertTimestamp(order.date);

  return (
    <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
      <td className="p-3">
        <p>{order.invoiceNumber}</p>
      </td>
      <td className="p-3">
        <p>{date}</p>
        <p className="text-gray-600">{time}</p>
      </td>
      <td className="p-3">
        <p>{order.paymentDetails.method}</p>
      </td>
      <td className="p-3">
        <span
          className={`px-3 py-1 font-semibold rounded-md ${
            order.status === "pending" && "bg-warning"
          } ${order.status === "processing" && "bg-info"} 
          ${order.status === "invoiced" && " bg-purple-500"} 
          ${
            order.status === "delivered" && "bg-success"
          } ${order.status === "cancelled" && "bg-red-700"} text-gray-50 `}
        >
          <span>{order.status}</span>
        </span>
      </td>
      <td className="p-3 ">
        <p>{order.totalAmount}TK.</p>
      </td>
      <td className="p-3 ">
        <span
          onClick={() => handleInvoiceModal(order)}
          className="btn btn-info btn-xs text-white"
        >
          INVOICE
        </span>
      </td>
    </tr>
  );
};

export default UserOrderTableRow;
