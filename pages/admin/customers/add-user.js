import React, { useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";
import { useForm } from "react-hook-form";
import { singleImageUploader } from "../../../lib/imageUploader";
import server_url from "../../../lib/config";
import { postMethodHook } from "../../../lib/usePostHooks";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
const AddUser = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [loading,setLoading]=useState(false)
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

  const url = `${server_url}/user/signup`;

  const handleAddNewUser = (data) => {
    setLoading(true)
    data.imageURL = imageUrl;
    postMethodHook(url, data, reset,setLoading);
  };
  let require = <span className="text-red-500">*</span>;

  return (
    <DashboardLayout>
      <div>
        <section className="bg-white">
          <div>
            <AdminDashboardBreadcrumb title={"Add User"} />
          </div>
          <main aria-label="Main" className="px-2 pb-8 sm:px-7">
            <div className="max-w-xl lg:max-w-3xl">
              <form
                onSubmit={handleSubmit(handleAddNewUser)}
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
                    type="text"
                    id="fullName"
                    {...register("fullName", { required: true })}
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
                    {...register("phone", { required: true })}
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
                    id="Email"
                    {...register("email", { required: true })}
                    placeholder="Email"
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
                    {...register("role", { required: true })}
                    className="select select-bordered shadow-sm w-full mt-1"
                  >
                    <option disabled selected hidden>
                      Select
                    </option>
                    <option value={"admin"}>Admin</option>
                    <option value={"user"}>User</option>
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
                    className="select select-bordered shadow-sm w-full mt-1"
                  >
                    <option disabled selected hidden>
                      Select
                    </option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    for="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password {require}
                  </label>

                  <input
                    type="text"
                    id="Password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    for="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation {require}
                  </label>

                  <input
                    type="text"
                    id="PasswordConfirmation"
                    {...register("confirmPassword", { required: true })}
                    placeholder="Confirm Password"
                    className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
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
                  </fieldset>
                </div>
                <button className="bg-success font-bold flex justify-center uppercase p-4 w-[10rem] py-2 rounded-md text-white">
                  {(loading)?<CustomButtonLoading/>:'Add User'}
                </button>
              </form>
            </div>
          </main>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AddUser;
