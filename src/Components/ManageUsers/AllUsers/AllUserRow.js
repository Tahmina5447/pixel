import { Icon } from "@iconify/react";
import React from "react";
import server_url from "../../../../lib/config";
import FetchUpdateHook from "../../../../lib/FetchUpdateHook";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import Image from "next/image";

const AllUserRow = ({ user, setSingeUser, handleOpen, handleUserDelete }) => {
  const handleChangeStatus = (event) => {
    const updateUrl = `${server_url}/user/${user._id}`;
    FetchUpdateHook(updateUrl, { status: event.target.value });
  };

  return (
    <tr key={user.id} className="whitespace-nowrap ">
      <td className="px-6 py-4 text-sm text-light-dark">
        {user?.imageURL ? (
          <Image
          width={200}
            height={200}
            src={user.imageURL}
            alt={"user profile"}
            className="w-8 h-8 rounded-md object-cover"
          />
        ) : (
          <Image
          width={200}
            height={200}
            src={"/assets/user.jpg"}
            alt={"user profile"}
            className="w-8 h-8 rounded-md object-cover"
          />
        )}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-light-dark ">
          {user?.email ? (
            user?.email?.slice(0, 8) + ".."
          ) : (
            <p className="text-[#cc3300] text-xs">Not Found</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-light-dark">{user.phone}</div>
      </td>
      <td className="px-6 py-4 ">
        <span className=" ">{user.role}</span>
      </td>
      <td className="px-6 py-4 ">
      
        <select
          onChange={handleChangeStatus}
          defaultValue={user.status}
          className={`outline-none cursor-pointer border border-primary rounded-md py-1 ${
            user.status === "blocked" && "text-red-600"
          }`}
        >
          <option selected={user.status === "active"} value={"active"}>
            Active
          </option>

          <option selected={user.status === "blocked"} value={"blocked"}>
            Banned
          </option>
        </select>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <Tooltip anchorSelect="#view">View Details</Tooltip>
          <Link
            id="view"
            href={"customers/user-details/" + user._id}
            className="bg-primary font-bold text-white rounded-md py-1 px-2 flex items-center justify-center "
          >
            Details
            <Icon icon="fa:arrow-circle-right" className="ml-2 text-white" />
          </Link>
          <Tooltip anchorSelect="#edit">Edit</Tooltip>
          <Link id="edit" href={`/admin/customers/update-user/${user._id}`}>
            <Icon
              icon="material-symbols:edit-document-rounded"
              className=" text-white text-2xl h-8 w-8 p-1 bg-primary font-bold  rounded-md  flex items-center justify-center hover:bg-[#43ff6403] border-primary border hover:text-primary"
            />
          </Link>
          <Tooltip anchorSelect="#delete">Delete</Tooltip>
          <button id="delete" onClick={() => handleUserDelete(user._id)}>
            <Icon
              icon="material-symbols:delete-forever"
              className="bg-[#FF0000]  p-1 w-8 h-8 rounded-md text-white"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AllUserRow;
