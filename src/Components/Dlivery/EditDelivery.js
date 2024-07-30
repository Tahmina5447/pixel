import React from "react";
import { useState } from "react";
import BdCity from "../BdCity";
import { useForm } from "react-hook-form";
import { updateMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";

const EditDelivery = ({ refetch, editShippingData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedCity, setSelectedCity] = useState(editShippingData.city);

  const handleUpdateShippingCost = (data) => {
    if (selectedCity.length <= 0) {
      return alert("Please Select City");
    }
    if (data.cost <= 0) {
      return alert("Shipping cost is not empty");
    }
    const url = server_url + "/delivery-cost/" + editShippingData._id;

    const shippingCost = {
      city: selectedCity,
      cost: data.cost || editShippingData?.cost,
    };

    updateMethodHook(url, shippingCost, refetch);
  };

  return (
    <div>
      <section className="p-6 bg-gray-100 text-gray-900">
        <div className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <form
              onSubmit={handleSubmit(handleUpdateShippingCost)}
              className=""
            >
              <div className="block md:flex items-baseline gap-2">
                <div className="">
                  <BdCity
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                  />
                </div>
                <div className="">
                  <label className="text-sm">Shipping Cost</label>
                  <input
                    type="Number"
                    defaultValue={editShippingData?.cost}
                    {...register("cost", { required: false })}
                    placeholder="Price"
                    className={`shadow-sm border  bg-white text-black w-64  p-3 flex items-center justify-between rounded-lg cursor-pointer `}
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  className={`btn btn-primary btn-sm `}
                  value="Update Cost"
                />
              </div>
            </form>
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default EditDelivery;
