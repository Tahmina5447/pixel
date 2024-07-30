import { data } from "autoprefixer";

import React, { useState } from "react";
import server_url from "../../../../lib/config";
import { deleteMethod, updateMethodHook } from "../../../../lib/usePostHooks";
import CustomModal from "../../../Shared/CustomModal";
import EditBrandInfo from "./EditBrandInfo";
import Image from "next/image";

const BrandTableRow = ({ brand, index, refetch }) => {
  const [modalIsOpenBrand, setIsOpenBrand] = useState(false);
  const url = `${server_url}/brands/${brand?._id}`;

  const handleDelete = () => {
    deleteMethod(url, refetch);
  };
  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
        <td className="p-3">
          <p>{index + 1}</p>
        </td>
        <td className="p-3">
          <Image
            src={brand?.image}
            width={100}
            height={100}
            alt={"Brand image"}
            className="w-12 rounded-md"
          />
        </td>
        <td className="p-3">
          <p>{brand?.name}</p>
        </td>

        <td className="p-3 ">
          <span
            onClick={() => setIsOpenBrand(true)}
            className="btn btn-success btn-xs text-white hover:bg-green-800"
          >
            Edit
          </span>
          <span onClick={handleDelete} className="btn btn-warning btn-xs ml-2 text-white hover:bg-red-500">
            Delete
          </span>
        </td>
      </tr>

      {modalIsOpenBrand && (
        <CustomModal modalIsOpen={modalIsOpenBrand} setIsOpen={setIsOpenBrand}>
          <h2 className="text-2xl uppercase font-bold">Update Brand</h2>
          <EditBrandInfo brand={brand} refetch={refetch} />
        </CustomModal>
      )}
    </>
  );
};

export default BrandTableRow;
