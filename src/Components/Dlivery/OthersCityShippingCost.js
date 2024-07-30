import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { othersCityShippingCost } from "../../../lib/helper";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";
const OthersCityShippingCost = () => {
  const { data, isLoading, refetch } = useQuery(
    ["others-shipping-cost"],
    othersCityShippingCost
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleOtherCity = (data) => {
    const url = `${server_url}/delivery-cost/others-city-shipping-cost`;
    updateMethodHook(url, data, refetch);
  };



  return (
    <div>
      <div className="p-6 rounded-md shadow-sm bg-gray-100">
        <h2 className=" text-2xl font-semibold leading-tight">Cities</h2>
        <p>Others cites default shipping cost setting here</p>
        <form
          onSubmit={handleSubmit(handleOtherCity)}
          className="overflow-x-auto mt-2"
        >
          <input
            type="Number"
            {...register("otherCityCost", { required: true })}
            placeholder="Amount"
            defaultValue={data?.data?.otherCityCost}
            className={`shadow-sm border  bg-white text-black w-64  p-3 flex items-center justify-between rounded-lg cursor-pointer `}
          />
          <div className="mt-2">
            <button type="submit" className="bg-primary font-bold text-white rounded-md py-1 px-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OthersCityShippingCost;
