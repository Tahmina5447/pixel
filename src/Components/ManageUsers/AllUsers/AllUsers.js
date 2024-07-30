import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import server_url from "../../../../lib/config";
import FetchGetHook from "../../../../lib/FetchGetHook";
import AllUserRow from "./AllUserRow";
import CustomPagination from "../../../Shared/CustomPagination";
import { getAdminToken } from "../../../../lib/getToken";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [singelUser, setSingeUser] = useState({});
  const handleOpen = () => setOpen(!open);
  const [reloader, setReloder] = useState(true);
  // ---------------for pagination-----------------------
  const [currentItems, setCurrentItems] = useState([]);

  // ---------------for pagination-----------------------

  let baseUrl = server_url + "/user";

  useEffect(() => {
    FetchGetHook(baseUrl, setUsers);
  }, [baseUrl, reloader]);

  const handleSearch = (e) => {
    const query = e.target.value;
    baseUrl += `?search=${query}`;
    FetchGetHook(baseUrl, setUsers);
  };

  const handleFilterUser = (e) => {
    const query = e.target.value;
    if (query === "all") {
      FetchGetHook(baseUrl, setUsers);
    } else {
      baseUrl += `?status=${query}`;
      FetchGetHook(baseUrl, setUsers);
    }
  };
  const handleFilterRole = (e) => {
    const query = e.target.value;
    if (query === "all") {
      FetchGetHook(baseUrl, setUsers);
    } else {
      baseUrl += `?role=${query}`;
      FetchGetHook(baseUrl, setUsers);
    }
  };

  // delete user
  const handleUserDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${server_url}/user/${id}`;
        fetch(url, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${getAdminToken()}`
          }
        })
          .then((res) => res.json())
          .then((data) => {
            swal("Successfully Deleted!", {
              icon: "success",
            });
            setReloder(!reloader);
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <div className=" lg:my-16 pr-5 ">
      <div className="flex flex-col md:flex-row  md:justify-between sm:mb-5 md:mb-10">
        <h1 className="text-primary text-2xl font-bold">All Users</h1>
        <div className=" flex flex-wrap gap-2 items-center">
          <div>
            <Link href={"/admin/customers/add-user"}>
              <button className=" px-3 py-2 cursor-pointer border flex gap-2 items-center bg-primary outline-none border-primary text-white hover:bg-[#43ff641a] duration-150 hover:text-primary rounded-md">
                <Icon icon="material-symbols:group-add" className="text-xl" />
                Add New
              </button>
            </Link>
          </div>
          <div className="border p-2 bg-white border-primary rounded-md">
            <select
              onChange={handleFilterUser}
              className="outline-none cursor-pointer"
            >
              <option value={"all"}>All Status</option>
              <option value={"active"}>Active</option>
              <option value={"blocked"}>Banned</option>
            </select>
          </div>
          <div className="border p-2 bg-white border-primary rounded-md">
            <select
              onChange={handleFilterRole}
              className="outline-none cursor-pointer "
            >
              <option value={"all"}>All Role</option>
              <option value={"user"}>Customers</option>
              <option value={"admin"}>Admin</option>
            </select>
          </div>
          <div className="flex sm:my-2 md:my-0 ">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Phone or Email"
              className="placeholder:text-lightGray p-2 rounded-s-md text-md border border-primary  focus:outline-none sm:w-full"
            />
            <div className="bg-primary rounded-e-md py-2 px-3 flex items-center justify-center">
              <Icon icon="fa:search" className=" text-white text-lg " />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:overflow-x-scroll mt-3 md:mt-0 md:overflow-x-scroll lg:overflow-x-hidden">
        <div className="border-b border-gray-200 shadow">
          <table className="w-full table-auto bg-[#F3F7FB]  divide-y divide-gray-300	">
            <thead className=" bg-primary text-white font-bold text-lg">
              <tr>
                <th className="px-6 py-4 text-start text-white">User</th>
                <th className="px-6 py-4 text-start text-white">Email</th>
                <th className="px-6 py-4 text-start text-white">Phone</th>
                <th className="px-6 py-4 text-start text-white">Role</th>
                <th className="px-6 py-4 text-start text-white">Status</th>
                <th className="px-6 py-4 text-start text-white">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary">
              {currentItems?.map((user) => (
                <AllUserRow
                  key={user}
                  handleUserDelete={handleUserDelete}
                  user={user}
                  setSingeUser={setSingeUser}
                  handleOpen={handleOpen}
                />
              ))}
            </tbody>
          </table>
          <CustomPagination
            arrayData={users}
            setCurrentItems={setCurrentItems}
            itemsPerPage={10}
          />
        </div>
      </div>
      {/* <DetailsUser open={open} handleClose={handleClose} user={singelUser} /> */}
    </div>
  );
};

export default AllUsers;
