import React, { useState } from "react";
import UserDashLayout from "../../../src/Components/userDashLayout";
import { useForm } from "react-hook-form";
import AuthUser from "../../../lib/AuthUser";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";

const Setting = () => {
  const { userInfo } = AuthUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    defaultValues: {},
  });
  const url = `${server_url}/user/change-password/${userInfo?._id}`;

  const handleUpdateUser = (data) => {
    updateMethodHook(url, data);
  };

  return (
    <UserDashLayout>
      <section className="my-8 md:my-16 mx-2 md:mx-8 p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md bg-white">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium text-2xl uppercase">Change Password</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="username" className="text-sm">
                  Old Password
                </label>
                <input
                  {...register("oldPassword", { required: true })}
                  type="text"
                  placeholder="Old Password"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="username" className="text-sm">
                  New Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="text"
                  placeholder="Password"
                  className="input w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-emerald-600 border-gray-300 text-gray-900"
                />
              </div>

              <div className="col-span-full">
                <button className="btn btn-success btn-sm hover:text-black text-white">
                  Change Password
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </UserDashLayout>
  );
};

export default Setting;
