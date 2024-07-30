import React, { useContext, useEffect, useState } from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";
import handleDelete from "../../../lib/handleDelete";
import handleUpdate from "../../../lib/handleUpdate";
import CreateContext from "../../Components/CreateContex";
import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";

const CartTableItem = ({ category, index, refetch }) => {
  const [reolder, setReloader] = useState();
  const router = useRouter();
  const { date, time } = convertTimestamp(category.createdAt);

  let fethUrl = "http://localhost:5000/api/v4/cart/delete/";
  const handleDeleteCategory = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fethUrl += id;
        handleDelete(fethUrl, setReloader, reolder);
      } else {
        swal("Category is safe!");
      }
    });
  };

  useEffect(() => {
    refetch();
  }, [reolder]);

  const handleEditCategory = (id) => {
    router.push(`/admin/admin-cart/view-cart?id=${id}`);
  };

  return (
    <tr className="py-10 text-center">
      <th>{index + 1}</th>

      <td>{category.phone}</td>
      <td>{date}</td>
      <td>{category.products.length}</td>
      <td>
        <button
          onClick={() => handleEditCategory(category.phone)}
          className="btn btn-xs font-medium btn-primary text-white"
        >
          View
        </button>
      </td>
      <td>
        <span className="flex justify-center gap-2">
          <button
            id="delete"
            onClick={() => handleDeleteCategory(category._id)}
            className="cursor-pointer"
          >
            <FaTrashAlt size={15} className="text-red-600 block mx-auto " />
          </button>
        </span>
      </td>
    </tr>
  );
};

export default CartTableItem;
