import React, { useState } from "react";
import UserDashLayout from "../../../src/Components/userDashLayout";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { singleImageUploader } from "../../../lib/imageUploader";
import AuthUser from "../../../lib/AuthUser";
import { getUsersById } from "../../../lib/helper";

import { useEffect } from "react";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import Image from "next/image";

const MyProfile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const { userInfo } = AuthUser();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery(["users"], () => {
    if (userInfo._id) {
      return getUsersById(userInfo._id);
    }
  });

  useEffect(() => {
    if (user) {
      setImageUrl(user.data.imageURL);
    }
  }, [user]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      fullName: user?.data?.fullName,
      email: user?.data?.email,
    },
  });

  const handleImageUpload = (e) => {
    singleImageUploader(e, setImageUrl, setImageUploadErrorMessage);
  };
  const url = `${server_url}/user/${user?.data?._id}`;

  const handleUpdateUser = (data) => {
    const newData = {
      fullName: data.fullName || user.data.fullName,
      address: data.address || user.data.address,
      phone: data.phone || user.data.phone,
      imageURL: imageUrl || "",
    };

    updateMethodHook(url, newData, refetch);
  };

  return (
    <UserDashLayout>
      <section className="my-8 md:my-16 mx-2 md:mx-8 p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium text-3xl">Update Profile</p>
              <p className="text-xs">Here my profile info.</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="username" className="text-sm">
                  Full Name
                </label>
                <input
                  {...register("fullName", { required: false })}
                  type="text"
                  defaultValue={user?.data?.fullName}
                  placeholder="Username"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="phone" className="text-sm">
                  Phone/Mobile
                </label>
                <input
                  type="text"
                  {...register("phone", { required: false })}
                  defaultValue={user?.data?.phone}
                  placeholder="Phone"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="email" className="text-sm">
                  Email Address
                </label>
                <input
                  type="text"
                  {...register("email", { required: false })}
                  defaultValue={user?.data?.email}
                  placeholder="email"
                  disabled
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="address" className="text-sm">
                  Your Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address", { required: false })}
                  defaultValue={user?.data?.address}
                  placeholder="Your Address"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <fieldset className="w-full space-y-1 text-gray-800">
                  <label for="files" className="block text-sm font-medium">
                    Image
                  </label>
                  <div className="flex">
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      name="files"
                      id="files"
                      className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100 w-full"
                    />
                  </div>
                </fieldset>
              </div>
              <div className="col-span-full sm:col-span-3 self-end">
                {imageUrl && (
                  <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md ">
                    <Image
                      src={imageUrl}
                      width="100"
                      height="2"
                      alt="category image"
                      className="w-full h-full object-contain  "
                    />
                  </div>
                )}
              </div>

              <div className="col-span-full">
                <button className="btn btn-success btn-sm hover:text-black text-white">
                  Update Profile
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </UserDashLayout>
  );
};

export default MyProfile;
