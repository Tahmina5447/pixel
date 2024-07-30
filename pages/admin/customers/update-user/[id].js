import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";
import { useForm } from "react-hook-form";
import { singleImageUploader } from "../../../../lib/imageUploader";
import server_url from "../../../../lib/config";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getUsersById } from "../../../../lib/helper";

import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import AuthUser from "../../../../lib/AuthUser";
import Image from "next/image";
const UpdateUser = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const { userInfo } = AuthUser()

  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, refetch } = useQuery(["users", id], () => {
    if (id) {
      return getUsersById(id);
    }
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data?.data?.imageURL);
      setUser(data);
    }
  }, [data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const handleImageUpload = (e) => {
    singleImageUploader(e, setImageUrl, setImageUploadErrorMessage);
  };

  const url = `${server_url}/user/${id}`;

  const handleUpdateUser = (data) => {
    const newData = {
      fullName: data?.fullName || user?.data?.fullName,
      address: data?.address || user?.data?.address,
      phone: data?.phone || user?.data?.phone,
      imageURL: imageUrl || "",
      address: data?.address || user?.data?.address,
      gender: data?.gender || user?.data?.gender,
      role: data?.role || user?.data?.role,
    };

    updateMethodHook(url, newData);
  };
  let require = <span className="text-red-500">*</span>;

  return (
    <DashboardLayout>
      <div>
        <section className="bg-white">
          <div>
            <AdminDashboardBreadcrumb title={"Update User"} />
          </div>
          <main aria-label="Main" className="px-2 pb-8 sm:px-7">
            <div className="max-w-xl lg:max-w-3xl">
              {!user?.data?.fullName ? (
                <LoadingComponets />
              ) : (
                <form
                  onSubmit={handleSubmit(handleUpdateUser)}
                  className="mt-8 grid grid-cols-6 gap-6"
                >
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name {require}
                    </label>

                    <input
                      defaultValue={user?.data?.fullName}
                      type="text"
                      id="fullName"
                      {...register("fullName", { required: false })}
                      placeholder="Full Name"
                      className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="Phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone {require}
                    </label>

                    <input
                      type="text"
                      id="Phone"
                      defaultValue={user?.data?.phone}
                      {...register("phone", { required: false })}
                      placeholder="Phone"
                      className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email {require}
                    </label>

                    <input
                      type="email"
                      defaultValue={user?.data?.email}
                      id="Email"
                      {...register("email", { required: false })}
                      placeholder="Email"
                      disabled={user?.data?.email === userInfo.email}
                      className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Choose Role {require}
                    </label>
                    <select
                      {...register("role", { required: false })}
                      defaultValue={user?.data?.role}
                      disabled={user?.data?.role === userInfo.role}
                      className="select select-bordered shadow-sm w-full mt-1"
                    >
                      <option disabled selected hidden>
                        Select
                      </option>
                      <option
                        value={"admin"}
                        selected={user?.data?.role === "admin"}
                      >
                        Admin
                      </option>
                      <option
                        value={"user"}
                        selected={user?.data?.role === "user"}
                      >
                        User
                      </option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="Address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>

                    <input
                      type="text"
                      id="Address"
                      defaultValue={user?.data?.address}
                      {...register("address", { required: false })}
                      placeholder="Address"
                      className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="Gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      {...register("gender", { required: false })}
                      defaultValue={user?.data?.gender}
                      className="select select-bordered shadow-sm w-full mt-1"
                    >
                      <option disabled selected hidden>
                        Select
                      </option>
                      <option
                        value={"male"}
                        selected={user?.data?.gender === "male"}
                      >
                        Male
                      </option>
                      <option
                        value={"female"}
                        selected={user?.data?.gender === "female"}
                      >
                        Female
                      </option>
                    </select>
                  </div>

                  <div className="col-span-6 ">
                    <fieldset className="w-full space-y-1 text-gray-800">
                      <label for="files" className="block text-sm font-medium">
                        Profile Photo
                      </label>
                      <div className="flex">
                        <input
                          onChange={handleImageUpload}
                          type="file"
                          name="files"
                          id="files"
                          className="px-8 w-full md:w-auto py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
                        />
                      </div>
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="profile pic"
                          width={100}
                          height={100}
                          className="w-10 h-10 rounded-md"
                        />
                      )}
                    </fieldset>
                  </div>
                  <button className="bg-success font-bold uppercase p-4 w-[10rem] py-2 rounded-md text-white">
                    Save
                  </button>
                </form>
              )}
            </div>
          </main>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default UpdateUser;
