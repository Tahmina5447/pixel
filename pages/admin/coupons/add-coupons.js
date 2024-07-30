import React, { useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";

import { BsCloudUploadFill } from "react-icons/bs";
import { TagsInput } from "react-tag-input-component";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";
import { singleImageUploader } from "../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import { getCategoriesAndSubCategory } from "../../../lib/helper";
import { useQuery } from "react-query";
import { postMethodHook, postMethodHookCup } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertTimestamp2 } from "../../../lib/convertTimestampDateAndTime";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
import Image from "next/image";
import { useRouter } from "next/router";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter()

  const [selectedChildCategory, setSelectedChildCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(false);
  // const [startDateInputType, setStartDateInputType] = useState('text');
  // const [endDateInputType, setEndDateInputType] = useState('text');
  const {
    data: categoryAndSubCategory,
    isLoading,
    refetch,
  } = useQuery(["category-SubCategory"], getCategoriesAndSubCategory);
  const handleImageUpload = (e) => {
    singleImageUploader(e, setImageUrl, setImageUploadErrorMessage);
  };

  const formattedStartDate = convertTimestamp2(startDate);
  const formattedEndDate = convertTimestamp2(endDate);

  const handleAddCoupon = (data) => {
    setLoading(true);
    const url = server_url + "/coupons";
    data.imageURL = imageUrl;
    data.startDate = formattedStartDate;
    data.expireDate = formattedEndDate;
    postMethodHookCup(url, data, setLoading,router);
  };

  // const handleFocusStartDateInputType = () => {
  //   setStartDateInputType('date');
  // };

  // const handleBlurStartDateInputType = () => {
  //   setStartDateInputType('text');
  // };
  // const handleFocusEndDateInputType = () => {
  //   setEndDateInputType('date');
  // };

  // const handleBlurEndDateInputType = () => {
  //   setEndDateInputType('text');
  // };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Add Coupons"}
          subtitle={"Add your Coupons and necessary information from here"}
        />
        <div className="mt-5 md:px-7">
          <div className="md:flex block items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Coupons Banner Image</p>
            </div>
            <div className="w-full md:w-[70%]  ">
              <div className="relative border-4 border-dashed w-full h-[150px]  text-center">
                <BsCloudUploadFill
                  size={35}
                  className="text-primary mx-auto block  mt-8"
                />
                <p className="text-xl font-bold  text-slate-900">
                  Drag your image here
                </p>
                <span className="text-xs font-bold text-slate-900">
                  (Only *.jpeg and *.png images will be accepted)
                </span>
                <span className="text-xs font-bold text-red-900">
                  {imageUploadErrorMessage && imageUploadErrorMessage}
                </span>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                />
              </div>
              {imageUrl && (
                <div className="w-[100px] h-[100px] p-3 bg-white shadow-md rounded-md mt-3">
                  <Image
                    src={imageUrl}
                    width="100"
                    height="100"
                    alt="category image"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
          {/* ----------------------end image------------------- */}
          <form onSubmit={handleSubmit(handleAddCoupon)}>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Coupon Name</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"text"}
                  {...register("campName", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Coupon Title "
                />
              </div>
            </div>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Coupon Code</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"text"}
                  {...register("couponCode", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Coupon code "
                />
              </div>
            </div>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Select Date Range</p>
              </div>
              <div className="w-full md:w-[70%]">
                <div id="modal_date">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    required
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    isClearable={true}
                    placeholderText="Select Date Range"
                    className="w-full border border-gray-300 rounded pl-4 pr-8 py-2 "
                  />
                </div>

                {/* <input
                  type={startDateInputType}
                  placeholder="mm/dd/yyy"
                  onFocus={handleFocusStartDateInputType}
                  onBlur={handleBlurStartDateInputType}
                  {...register("startDate", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                /> */}
              </div>
            </div>
            {/* <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>expire Date </p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type={endDateInputType}
                  placeholder="mm/dd/yyy"
                  onFocus={handleFocusEndDateInputType}
                  onBlur={handleBlurEndDateInputType}
                  {...register("expireDate", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                />
              </div>
            </div> */}
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Discount Percentage</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type="number"
                  {...register("discountPercentage", {
                    required: true,
                    maxLength: {
                      value: 2,
                      message: "You can add  up to 99%",
                    },
                  })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Discount Percentage"
                />
                <small className="text-[#FF4B2B] text-xs font-medium my-2">
                  {errors?.discountPercentage?.message}
                </small>
              </div>
            </div>
            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Minimum Amount</p>
              </div>
              <div className="w-full md:w-[70%]">
                <input
                  type="number"
                  {...register("minAmount", { required: true })}
                  className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                  placeholder="Minimum Amount"
                />
              </div>
            </div>

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-full md:w-[30%] text-lg font-semibold">
                <p>Which Category and Subcategory</p>
              </div>
              <div className="w-full md:w-[70%]">
                <select
                  {...register("underOfCategory", { required: true })}
                  className="select select-bordered w-full  focus:outline-none "
                  placeholder="Type"
                >
                  <option disabled selected hidden>
                    Select Type
                  </option>
                  <option value={"all"}>All</option>

                  {categoryAndSubCategory?.data?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:flex block items-center gap-5 mb-4">
              <div className="w-[30%] text-lg font-semibold md:block hidden"></div>
              <div className="w-full md:w-[70%]">
                <input
                  type={"submit"}
                  className="btn btn-primary w-full text-white"
                  value={"Add Coupon"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
