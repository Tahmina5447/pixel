import React, { useEffect, useState } from "react";
import AuthUser from "../../../lib/AuthUser";
import server_url from "../../../lib/config";
import { singleImageUploader } from "../../../lib/imageUploader";
import { updateMethodHook, updateMyShopHook } from "../../../lib/usePostHooks";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";
import { useForm } from "react-hook-form";
import { getMyShopData } from "../../../lib/helper";
import { useQuery } from "react-query";

import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
import Image from "next/image";
const MyShop = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = AuthUser();

  const [user, setUser] = useState({});

  const { data, isLoading, refetch } = useQuery(["my-shop"], getMyShopData);

  useEffect(() => {
    if (data) {
      setImageUrl(data?.data?.logo);
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
  const url = `${server_url}/my-shop/update-shop?uid=${data?.data?._id}`;

  // ---------------update shop data------------------
  const handleUpdateUser = (data) => {
    setLoading(true);
    const newData = {
      shopName: data?.shopName || user?.data?.shopName,
      email: data?.email || user?.data?.email,
      address: data?.address || user?.data?.address,
      phone: data?.phone || user?.data?.phone,
      logo: imageUrl || "",
      address: data?.address || user?.data?.address,
      facebookPage: data?.facebookPage || user?.data?.facebookPage,
      facebookGroup: data?.facebookGroup || user?.data?.facebookGroup,
      Youtube: data?.Youtube || user?.data?.Youtube,
      twitter: data?.twitter || user?.data?.twitter,
      linkedin: data?.linkedin || user?.data?.linkedin,
      aboutShop: data?.aboutShop || user?.data?.aboutShop,
      tiktok:data?.tiktok || user.data.tiktok,
      whatsApp:data?.whatsApp || user.data.whatsApp,
      bKash:data?.bKash || user.data.bKash,
      rocket:data?.rocket || user.data.rocket,
      nagad:data?.nagad || user.data.nagad,
    };

    updateMyShopHook(url, newData, setLoading);
  };
  let require = <span className="text-red-500">*</span>;

  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"MY SHOP"} />
      <div className="">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              for="shopName"
              className="block text-sm font-medium text-gray-700"
            >
              Shop Name {require}
            </label>

            <input
              defaultValue={user?.data?.shopName}
              type="text"
              id="shopName"
              {...register("shopName", { required: false })}
              placeholder="Shop Name"
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
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
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
              for="facebookGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Bkash Number
            </label>

            <input
              type="tel"
              id="facebookGroup"
              defaultValue={user?.data?.bKash}
              {...register("bKash", {
                required: { required: false },
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must consist of digits only.",
                },
              })}
              onKeyUp={(e) => {
                trigger("bKash");
              }}
              placeholder="bkash"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
              {errors?.bKash?.message}
            </small>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Nagad Number
            </label>

            <input
              type="tel"
              id="facebookGroup"
              defaultValue={user?.data?.nagad}
              {...register("nagad", {
                required: { required: false },
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must consist of digits only.",
                },
              })}
              onKeyUp={(e) => {
                trigger("nagad");
              }}
              placeholder="Nagad"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
              {errors?.nagad?.message}
            </small>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Rocket Number
            </label>

            <input
              type="tel"
              id="facebookGroup"
              defaultValue={user?.data?.rocket}
              {...register("rocket", {
                required: { required: false },
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must consist of digits only.",
                },
              })}
              onKeyUp={(e) => {
                trigger("rocket");
              }}
              placeholder="rocket"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
              {errors?.rocket?.message}
            </small>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Whatsapp Number
            </label>

            <input
              type="text"
              id="facebookGroup"
              defaultValue={user?.data?.whatsApp}
              {...register("whatsApp", {
                required: { required: false },
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must be 11 digit.",
                },
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must consist of digits only.",
                },
              })}
              onKeyUp={(e) => {
                trigger("whatsApp");
              }}
              placeholder="whatsApp"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <small className="text-[#FF4B2B] text-xs ml-2 font-medium my-2">
              {errors?.whatsApp?.message}
            </small>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookPage"
              className="block text-sm font-medium text-gray-700"
            >
              FacebookPage
            </label>

            <input
              type="text"
              id="facebookPage"
              defaultValue={user?.data?.facebookPage}
              {...register("facebookPage", { required: false })}
              placeholder="facebookPage"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              for="facebookGroup"
              className="block text-sm font-medium text-gray-700"
            >
              facebookGroup
            </label>

            <input
              type="text"
              id="facebookGroup"
              defaultValue={user?.data?.facebookGroup}
              {...register("facebookGroup", { required: false })}
              placeholder="facebookGroup"
              className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="">
                <label
                  for="aboutShop"
                  className="block text-sm font-medium text-gray-700"
                >
                  About Shop
                </label>

                <textarea
                  type="text"
                  id="aboutShop"
                  defaultValue={user?.data?.aboutShop}
                  {...register("aboutShop", { required: false })}
                  placeholder="aboutShop"
                  className="textarea textarea-bordered  w-full mt-1 "
                  rows={10}
                ></textarea>
              </div>
            </div>
            <div className="grid gap-5">
              <div className="">
                <label
                  for="Youtube"
                  className="block text-sm font-medium text-gray-700"
                >
                  Youtube
                </label>

                <input
                  type="text"
                  id="Youtube"
                  defaultValue={user?.data?.Youtube}
                  {...register("Youtube", { required: false })}
                  placeholder="Youtube"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="">
                <label
                  for="twitter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instagram
                </label>

                <input
                  type="text"
                  id="twitter"
                  defaultValue={user?.data?.twitter}
                  {...register("twitter", { required: false })}
                  placeholder="instagram"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="">
                <label
                  for="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  linkedin
                </label>

                <input
                  type="text"
                  id="linkedin"
                  defaultValue={user?.data?.linkedin}
                  {...register("linkedin", { required: false })}
                  placeholder="linkedin"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="">
                <label
                  for="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tit tok
                </label>

                <input
                  type="text"
                  id="linkedin"
                  defaultValue={user?.data?.tiktok}
                  {...register("tiktok", { required: false })}
                  placeholder="tiktok"
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="col-span-6 ">
            <fieldset className="w-full space-y-1 text-gray-800">
              <label for="files" className="block text-sm font-medium">
                Logo
              </label>
              <div className="flex">
                <input
                  onChange={handleImageUpload}
                  type="file"
                  name="files"
                  id="files"
                  className="px-8 py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100"
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
          <button className="bg-success flex justify-center font-bold uppercase p-4 w-[10rem] py-2 rounded-md text-white">
            {loading ? <CustomButtonLoading /> : "Save"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default MyShop;
