import React, { useContext, useEffect } from "react";
import { useState } from "react";
import PathoCity from "../../../Shared/AddressInput/PathoCity";
import PathoZonelist from "../../../Shared/AddressInput/PathoZonelist";
import PathoArealist from "../../../Shared/AddressInput/PathoArealist";
import CustomeInput from "../../../Shared/AddressInput/CustomeInput";
import { useForm } from "react-hook-form";
import AuthUser from "../../../../lib/AuthUser";
import { getMyShopData } from "../../../../lib/helper";
import { useQuery } from "react-query";
import { useCustomPost } from "../../../../lib/useCustomPost";
import { updateMethodHook } from "../../../../lib/usePostHooks";
import server_url from "../../../../lib/config";
import CreateContext from "../../CreateContex";
import axios from "axios";

const Pathaw = ({ order, refetch, setIsOpen, siteApiSettingData }) => {
  const { data } = useQuery(["my-shop"], getMyShopData);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedZone, setSelectedZone] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [dalevary, setDalevary] = useState(48);
  const { pathoToken } = useContext(CreateContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const handleFilterWithParantCategory = (event) => {
    setDalevary(event.target.value);
  };

  const onSubmitForm = async (item) => {
    const pathoData = {
      store_id: siteApiSettingData?.data?.pathaoApiStoreId,
      merchant_order_id: order?.invoiceNumber,
      sender_name: data?.data?.shopName,
      sender_phone: data?.data?.phone,
      recipient_name:
        order?.shippingAddress?.firstName +
        " " +
        order?.shippingAddress?.lastName,
      recipient_phone: order?.shippingAddress?.phone,
      recipient_address: order?.shippingAddress?.address,
      recipient_city: parseInt(selectedCity),
      recipient_zone: parseInt(selectedZone),
      recipient_area: parseInt(selectedArea),
      delivery_type: dalevary,
      item_type: 2,
      special_instruction: item.special_instruction,
      item_quantity: order?.orderItem.length,
      item_weight: item?.item_weight,
      amount_to_collect: order?.afterDiscountPrice,
      item_description: "This is item descriptions.",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/pathao/orders",
        {
          pathoData,
          pathoToken,
        }
      );
      // console.log("response------------", response)
      if (response.data) {
        // console.log("data------------", response?.data)
        const url = `${server_url}/order/${order._id}`;
        const body = { status: "processing", courierName: "pathao" };
        await updateMethodHook(url, body, refetch);
        setIsOpen(false);
      } else {
        swal("error", "  ", "error");
        console.log(response.data.error);
      }
    } catch (error) {
      swal("error", "order not send", "error");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)} className=" mt-5 ">
        <div className="flex items-center w-full gap-5">
          {/* ======get city name====== */}
          <div className=" w-full">
            <PathoCity
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              siteApiSettingData={siteApiSettingData}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.address?.message}
            </small>
          </div>
          <div className="w-full">
            {/* ======get Zone name====== */}
            <PathoZonelist
              selected={selectedZone}
              setSelected={setSelectedZone}
              active={selectedCity}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.address?.message}
            </small>
          </div>
        </div>

        <div className="flex items-center w-full gap-5">
          <div className=" w-full">
            {/* ======get Aren name====== */}
            <PathoArealist
              selected={selectedArea}
              setSelected={setSelectedArea}
              active={selectedZone}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.address?.message}
            </small>
          </div>
          <div className="w-full">
            {/* ======get Item Weight====== */}
            <CustomeInput
              lable={"Item Weight"}
              type={"number"}
              name={"item_weight"}
              placeholder={"Enter Item Weight"}
              regester={register("item_weight", {
                required: "Item Weight is required",
              })}
              onKeyUp={(e) => {
                trigger("item_weight");
              }}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.item_weight?.message}
            </small>
          </div>
        </div>

        <div className="flex items-center w-full gap-5 mt-5">
          <div className=" w-full">
            {/* ======get Special Instruction====== */}
            <CustomeInput
              lable={"Special Instruction"}
              type={"text"}
              name={"special_instruction"}
              placeholder={"Enter Special Instruction"}
              regester={register("special_instruction", {
                required: "Special Instruction is required",
              })}
              onKeyUp={(e) => {
                trigger("special_instruction");
              }}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.special_instruction?.message}
            </small>
          </div>
          <div className="w-full">
            <div className="block md:flex items-start flex-col">
              <label htmlFor="name" className="leading-7 text-sm ">
                delivery type
              </label>
              <div className="w-full ">
                <select
                  onChange={handleFilterWithParantCategory}
                  value={dalevary}
                  className="select select-bordered w-full  focus:outline-none "
                  placeholder="Category"
                // {...register("category", { required: true })}
                >
                  <option value={48}>48 for Normal Delivery</option>
                  <option value={12}>12 for On Demand Delivery</option>
                </select>
              </div>
            </div>
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.item_type?.message}
            </small>
          </div>
        </div>
        <div className="modal-action text-center">
          <button type="submit" className="btn bg-primary text-white my-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pathaw;
