import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomButtonLoading from '../../Shared/CustomButtonLoading';

const ShippingCostForm = ({ handleAddOrUpdateShippingCost, loading, defaultValues }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues); // Reset form with default values once they are fetched
  }, [defaultValues, reset]);


  return (
    <div>
      <section className="p-6 bg-gray-100 text-gray-900">
        <form onSubmit={handleSubmit(handleAddOrUpdateShippingCost)} className="">
          <div className="mb-4">
            <p className="mb-2">Inside Dhaka City (ঢাকা সিটির ভিতরে)</p>
            <input
              type="number"
              className="border border-black/40 rounded-md px-3 py-1 w-[350px]"
              placeholder=""
              {...register("inDhaka", { required: true })}
            />
          </div>
          <div className="mb-4">
            <p className="mb-2">Outside Dhaka City (সাভার, আশুলিয়া, কেরানিগঞ্জ)</p>
            <input
              type="number"
              placeholder=""
              className="border border-black/40 rounded-md px-3 py-1 w-[350px]"
              {...register("outDhaka", { required: true })}
            />
          </div>
          <div className="mb-4">
            <p className="mb-2">Others (অন্যান্য জেলা)</p>
            <input
              type="number"
              placeholder=""
              className="border border-black/40 rounded-md px-3 py-1 w-[350px]"
              {...register("others", { required: true })}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`btn btn-primary btn-sm text-white`}
            >
              {loading ? <CustomButtonLoading /> : "Save"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ShippingCostForm;
