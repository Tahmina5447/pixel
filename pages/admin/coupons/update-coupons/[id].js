import React, { useState } from "react";
import DashboardLayout from "../../../../src/Components/DashboardLayout";

import { BsCloudUploadFill } from "react-icons/bs";
import { TagsInput } from "react-tag-input-component";
import AdminDashboardBreadcrumb from "../../../../src/Shared/AdminDashboardBreadcrumb";
import { singleImageUploader } from "../../../../lib/imageUploader";
import { useForm } from "react-hook-form";
import { getCategoriesAndSubCategory } from "../../../../lib/helper";
import { useQuery } from "react-query";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import server_url from "../../../../lib/config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingComponets from "../../../../src/Shared/LoadingComponets";
import { convertTimestamp2 } from "../../../../lib/convertTimestampDateAndTime";
import Image from "next/image";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedChildCategory, setSelectedChildCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [coupon, setCoupon] = useState({});
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const id = router.query.id;
  let url = server_url + "/coupons";

  const {
    data: categoryAndSubCategory,
    isLoading,
    refetch,
  } = useQuery(["category-SubCategory"], getCategoriesAndSubCategory);


  useEffect(() => {
    if (id) {
      setLoading(true);
      url += `/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setImageUrl(data.data.imageURL[0]);
            setCoupon(data?.data);
            setDateRange([
              data.data.startDate ? new Date(data.data.startDate) : null,
              data.data.expireDate ? new Date(data.data.expireDate) : null,
            ]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, url]);

  const handleImageUpload = (e) => {
    singleImageUploader(e, setImageUrl, setImageUploadErrorMessage);
  };

  const formattedStartDate = convertTimestamp2(startDate);
  const formattedEndDate = convertTimestamp2(endDate);

  const handleAddCoupon = (data) => {
    url += `/${id}`;
    data.imageURL = imageUrl;
    const newData = {
      campName: data.campName || coupon.campName,
      expireDate: formattedEndDate || coupon.expireDate,
      startDate: formattedStartDate || coupon.startDate,
      couponCode: data.couponCode || coupon.couponCode,
      discountPercentage: data.discountPercentage || coupon.discountPercentage,
      minAmount: data.minAmount || coupon.minAmount,
      underOfCategory: data.underOfCategory || coupon.underOfCategory,
      imageURL: imageUrl,
    };

    updateMethodHook(url, newData);
  };
  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Update Coupons"}
          subtitle={"update your Coupons and necessary information from here"}
        />
        {coupon?.campName && (
          <div className="my-20 md:px-7">
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
                  <p>Campaign Name</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type={"text"}
                    defaultValue={coupon?.campName}
                    {...register("campName", { required: false })}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Campaign Title "
                  />
                </div>
              </div>
              <div className="md:flex block items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold">
                  <p>Campaign Code</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type={"text"}
                    {...register("couponCode", { required: false })}
                    defaultValue={coupon?.couponCode}
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
                      className="w-full border border-gray-300 rounded pl-2 pr-8 py-2 "
                    />
                  </div>
                </div>
              </div>
              {/* <div className="md:flex block items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold">
                  <p>expire Date </p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="Date"
                    {...register("expireDate", { required: false })}
                    defaultValue={coupon?.expireDate}
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
                    {...register("discountPercentage", { required: false })}
                    defaultValue={coupon?.discountPercentage}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Discount Percentage"
                  />
                </div>
              </div>
              <div className="md:flex block items-center gap-5 mb-4">
                <div className="w-full md:w-[30%] text-lg font-semibold">
                  <p>Minimum Amount</p>
                </div>
                <div className="w-full md:w-[70%]">
                  <input
                    type="number"
                    {...register("minAmount", { required: false })}
                    defaultValue={coupon?.minAmount}
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
                    {...register("underOfCategory", { required: false })}
                    defaultValue={coupon.underOfCategory}
                    className="select select-bordered w-full  focus:outline-none "
                    placeholder="Type"
                  >
                    <option
                      value={"all"}
                      selected={"all" === coupon.underOfCategory}
                    >
                      All
                    </option>

                    {categoryAndSubCategory?.data?.map((item, index) => (
                      <option
                        value={item}
                        key={index}
                        selected={item === coupon.underOfCategory}
                      >
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
                    value={"Update Coupon"}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
