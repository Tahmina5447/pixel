import React from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import useSiteApiSettingUpdateWithFetch from "../../../lib/useSiteApiSettingUpdateWithFetch";
import { useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useContext } from "react";
import CreateContext from "../../../src/Components/CreateContex";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
const SiteApiSetting = () => {
  const [loading, setLoading] = useState(false);
  const { siteApiSettingData, setSiteApiSettingData } =
    useContext(CreateContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("fbPixelId", siteApiSettingData?.data?.fbPixelId);
    setValue(
      "pathaoApiAccessToken",
      siteApiSettingData?.data?.pathaoApiAccessToken
    );
    setValue("pathaoApiBaseUrl", siteApiSettingData?.data?.pathaoApiBaseUrl);
    setValue("pathaoApiStoreId", siteApiSettingData?.data?.pathaoApiStoreId);
    setValue(
      "redxApiAccessToken",
      siteApiSettingData?.data?.redxApiAccessToken
    );
    setValue("redxApiBaseUrl", siteApiSettingData?.data?.redxApiBaseUrl);
    setValue(
      "steadFastApiBaseUrl",
      siteApiSettingData?.data?.steadFastApiBaseUrl
    );
    setValue("steadFastApiKey", siteApiSettingData?.data?.steadFastApiKey);
    setValue(
      "steadFastSecretKey",
      siteApiSettingData?.data?.steadFastSecretKey
    );
  }, [siteApiSettingData]);

  const handleUpdateSiteApiSetting = (data) => {
    setLoading(true);
    useSiteApiSettingUpdateWithFetch(data, setSiteApiSettingData, setLoading);
    swal("success", "message", "success");
  };


  return (
    <DashboardLayout>
      <AdminDashboardBreadcrumb title={"Site Api Setting"} />
      <form
        onSubmit={handleSubmit(handleUpdateSiteApiSetting)}
        className="mt-5 "
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* --------------------------this field for steadFast api setup-----------------  */}
          <div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-center font-bold text-lg ">
                SteadFast Api Setup
              </div>
              <div className="mt-7 ">
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">
                    SteadFast Api Base Url:
                  </p>
                  <textarea
                    type="text"
                    {...register("steadFastApiBaseUrl")}
                    className="w-full h-20 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter SteadFast Api Base Url"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">
                    SteadFast Api Key:
                  </p>
                  <textarea
                    type="text"
                    {...register("steadFastApiKey")}
                    className="w-full h-20 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter SteadFast Api Key"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">
                    SteadFast Secret Key:
                  </p>
                  <textarea
                    type="text"
                    {...register("steadFastSecretKey")}
                    className="w-full h-20 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter SteadFast Secret Key"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------this field for pathao api setup-----------------  */}
          <div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-center font-bold text-lg ">
                Pathao Api Setup
              </div>
              <div className="mt-7 ">
                <div className="">
                  <p className="text-[13px] font-extrabold">Client Id:</p>
                  <textarea
                    type="text"
                    {...register("pathaoApiBaseUrl")}
                    className="w-full h-[45px] py-2  rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Pathao Api Base Url"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">Client Secret:</p>
                  <textarea
                    type="text"
                    {...register("pathaoApiAccessToken")}
                    className="w-full h-[45px] py-2 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Pathao Api Access Token"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">Client Email:</p>
                  <textarea
                    type="text"
                    {...register("redxApiBaseUrl")}
                    className="w-full h-[45px] py-2 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Pathao Api Access Token"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">Client password:</p>
                  <textarea
                    type="text"
                    {...register("redxApiAccessToken")}
                    className="w-full h-[45px] py-2 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Pathao Api Access Token"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">
                    Pathao Api Store Id:
                  </p>
                  <input
                    type="text"
                    {...register("pathaoApiStoreId")}
                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Pathao Api Store Id"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* --------------------------this field for redx api setup-----------------  */}
          <div>
                        <div className='p-3 bg-white rounded-lg shadow-sm'>
                            <div className='text-center font-bold text-lg '>Redx Api Setup</div>
                            <div className='mt-7 '>
                                <div className="">
                                    <p className='text-[13px] font-extrabold'>Redx Api Base Url:</p>
                                    <textarea
                                        type="text"
                                        {...register("redxApiBaseUrl")}
                                        className="w-full h-20 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                        placeholder="Enter Redx Api Base Url"
                                    >
                                    </textarea>
                                </div>
                                <div className="mt-2">
                                    <p className='text-[13px] font-extrabold'>Redx Api Access Token:</p>
                                    <textarea
                                        type="text"
                                        {...register("redxApiAccessToken")}
                                        className="w-full h-20 rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                        placeholder="Enter Redx Api Access Token">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
          {/* ----------------this field for fecebook pixel id setup----------------- */}
          {/* <div>
            <div className="p-3 bg-white rounded-lg  shadow-sm">
              <div className="text-center font-bold text-lg">
                Facebook Pixel Id Setup
              </div>
              <div className="mt-7 ">
                <div className="mt-2">
                  <p className="text-[13px] font-extrabold">
                    Facebook Pixel Id:
                  </p>
                  <textarea
                    type="text"
                    {...register("fbPixelId")}
                    className=" mt-1 h-20 w-full rounded border p-2 focus:border-primary duration-300 ease-in-out focus:outline-none"
                    placeholder="Enter Facebook Pixel Id"
                  ></textarea>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className=" gap-5 my-4">
          <button className="btn btn-primary ml-auto text-white  gap-1">
            {loading ? <CustomButtonLoading /> : "Save"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default SiteApiSetting;
