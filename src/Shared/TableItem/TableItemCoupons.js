import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import server_url from "../../../lib/config";
import { updateMethodHook, deleteMethod } from "../../../lib/usePostHooks";
import { Tooltip } from "react-tooltip";

const CouponsTableItem = ({ coupon, index, refetch }) => {
  let url = server_url + `/coupons/`;
  const router = useRouter();

  const handleUpdateStatus = (data) => {
    let bodyData = {};
    if (data.status === "active") {
      bodyData = {
        status: "inactive",
      };
    } else {
      bodyData = {
        status: "active",
      };
    }

    url += coupon._id;
    updateMethodHook(url, bodyData, refetch);
  };
  const handleUpdateShow = (data) => {
    let bodyData = {};
    if (data.show === "on") {
      bodyData = {
        show: "off",
      };
    } else {
      bodyData = {
        show: "on",
      };
    }

    url += coupon._id;
    updateMethodHook(url, bodyData, refetch);
  };

  const handleDelete = (id) => {
    url += id;
    deleteMethod(url, refetch);
  };

  return (
    <tr className="py-10 text-center">
      <th>{index + 1}</th>
      <td>{coupon.startDate}</td>
      <td>{coupon.expireDate}</td>
      <td>{coupon.campName}</td>
      <td>{coupon.couponCode}</td>
      <td>{coupon.discountPercentage}%</td>
      <td>{coupon.underOfCategory}</td>
      <td>{coupon.minAmount}</td>

      <td>
        <button
          onClick={() => handleUpdateShow(coupon)}
          className={`btn btn-xs rounded-lg text-white text-xs ${coupon.show === "on" ? "btn-success" : "btn-warning"
            }`}
        >
          {coupon?.show}
        </button>
      </td>
      <td>
        <button
          onClick={() => handleUpdateStatus(coupon)}
          className={`btn btn-xs rounded-lg text-white text-xs ${coupon.status === "active" ? "btn-success" : "btn-warning"
            }`}
        >
          {coupon.status}
        </button>
      </td>

      <td>
        <span className="flex justify-center ">
          <Tooltip anchorSelect="#edit">Edit</Tooltip>
          <FaEdit
            id="edit"
            onClick={() => router.push("coupons/update-coupons/" + coupon._id)}
            size={17}
            className="text-warning block mx-auto cursor-pointer  duration-150"
          />
          <Tooltip anchorSelect="#delete">Delete</Tooltip>
          <FaTrashAlt
            id="delete"
            onClick={() => handleDelete(coupon._id)}
            size={15}
            className="text-red-600 block mx-auto cursor-pointer  duration-150"
          />
        </span>
      </td>
    </tr>
  );
};

export default CouponsTableItem;
