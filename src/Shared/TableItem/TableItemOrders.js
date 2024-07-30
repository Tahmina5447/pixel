import React from "react";
import { GrFormView } from "react-icons/gr";
import server_url from "../../../lib/config";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";
import { postMethodHook, updateMethodHook } from "../../../lib/usePostHooks";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import handleDelete2 from "../../../lib/handleDelete2";
import { FaTrashAlt } from "react-icons/fa";
const OrdersTableItem = ({ order, handleInvoiceModal, refetch }) => {
  const { date, time } = convertTimestamp(order.date);
  const handleUpdateStatus = (e) => {
    let value = e.target.value;
    if (value === "cancelled") {
      // here api call for stock minus & SaleCount Minus using orderItems, post method
      const data = order.orderItem;
      const url = `${server_url}/order/cancel-order`;
      updateMethodHook(url, data, refetch);
    }
    const url = `${server_url}/order/${order._id}`;
    const body = { status: value };
    updateMethodHook(url, body, refetch);
  };

  let fethUrl = "http://localhost:5000/api/v1/order/";

  const handleDeleteOrder = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this order.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fethUrl += id;
        handleDelete2(fethUrl, refetch);
      } else {
        swal("Product is safe!");
      }
    });
  };

  return (
    <tr className="py-10 text-center">
      <td>
        <div className=" flex items-center flex-col">
          <span className="font-bold">{order?.invoiceNumber}</span>
          <span>{date}</span>
        </div>
      </td>
      {/* <td>
        <p>{date}</p> <p>{time}</p>
      </td> */}
      <td>
        <p>{order?.shippingAddress?.firstName}</p>
      </td>
      <td>
        {order?.shippingAddress?.address?.length <= 20
          ? order?.shippingAddress?.address.slice(0, 20)
          : order?.shippingAddress?.address.slice(0, 20) + "..."}
      </td>
      <td>{order?.shippingAddress?.phone}</td>
      <td>{order?.paymentDetails?.method}</td>
      <td>{order?.totalAmount}TK.</td>
      <td>
        <Link
          href={`orders/order-details/${order._id}`}
          className="btn btn-xs rounded-lg text-white btn-success"
        >
          Details
        </Link>
      </td>
      <td>
        <div className=" uppercase text-[13px]">
          {order.courierName === "not found" && (
            <span className=" text-red-500 font-bold">{order?.courierName}</span>
          )}
          {order.courierName === "patho" && (
            <span className="px-2 py-1 rounded-md font-bold text-white bg-[#e83330] uppercase">
              {order?.courierName}
            </span>
          )}
          {order.courierName === "steadfast" && (
            <span className="px-2 py-1  rounded-md font-bold text-white bg-[#1dc68c] uppercase">
              {order?.courierName}
            </span>
          )}
          {order.courierName === "redx" && (
            <span className="px-2 py-1 rounded-md text- font-bold bg-yellow-500 uppercase">
              {order?.courierName}
            </span>
          )}
        </div>
      </td>
      <td>
        <select
          onChange={handleUpdateStatus}
          className={`select select-bordered w-[150px] max-w-xs ${order.status === "cancelled" && "text-red-800 font-bold"
            }`}
        >
          <option disabled selected hidden>
            Status
          </option>
          <option value={"pending"} selected={order.status === "pending"}>
            Pending
          </option>
          <option value={"processing"} selected={order.status === "processing"}>
            Processing
          </option>
          <option value={"invoiced"} selected={order.status === "invoiced"}>
            Invoiced
          </option>
          <option value={"delivered"} selected={order.status === "delivered"}>
            Delivered
          </option>
          <option value={"cancelled"} selected={order.status === "cancelled"}>
            Cancelled
          </option>
        </select>
      </td>
      <td>
        <div className=" flex items-center gap-2">
          <span className="  h-full">
            <Tooltip anchorSelect="#edit"> View Invoice</Tooltip>
            <GrFormView
              id="edit"
              onClick={() => handleInvoiceModal(order)}
              size={25}
              className="text-black block h-full mx-auto cursor-pointer"
            />
          </span>
          <span>
            <Tooltip anchorSelect="#delete">Delete Order</Tooltip>
            <FaTrashAlt
              id="delete"
              onClick={() => handleDeleteOrder(order._id)}
              size={18}
              className="text-red-600 block mx-auto  cursor-pointer"
            />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default OrdersTableItem;
