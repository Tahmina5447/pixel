import React from "react";
import { useForm } from "react-hook-form";
import CustomeInput from "../../../../Shared/AddressInput/CustomeInput";
import { useState } from "react";
import {
  ModalPostMethodHook,
  postMethodHook,
} from "../../../../../lib/usePostHooks";
import CustomButtonLoading from "../../../../Shared/CustomButtonLoading";

const AddBalance = ({ refetch, setBalanceAddShow }) => {
  const [bgColor, setBgColor] = useState("#7F1D1D");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();
  const colors = [
    {
      name: "#7F1D1D",
    },
    {
      name: "#1D4ED8",
    },
    {
      name: "#C2410C",
    },
    {
      name: "#15803D",
    },
    {
      name: "#4D7C0F",
    },
    {
      name: "#BE185D",
    },
    {
      name: "#38CACA",
    },
    {
      name: "#DC2643",
    },
  ];

  const addAcount = (data) => {
    const url =
      "http://localhost:5000/api/v2/accounts/opening-balance";
    const body = {
      accountName: data.accountName,
      amount: Number(data.amount),
      bgColor,
    };
    ModalPostMethodHook(url, body, refetch, setLoading, setBalanceAddShow);
  };

  return (
    <div className="md:w-[800px] w-full py-5">
      <h2 className=" text-[25px] font-bold">Add New Balance Account :</h2>
      <form
        onSubmit={handleSubmit(addAcount)}
        className="mt-5 border p-3 md:p-6 rounded-md"
      >
        <div className=" w-full">
          {/* ======get Account Name====== */}
          <CustomeInput
            lable={<p>Account Name : </p>}
            type={"text"}
            name={"accountName"}
            placeholder={"Enter Account Name"}
            regester={register("accountName", {
              required: "Account Name is required",
            })}
            onKeyUp={(e) => {
              trigger("accountName");
            }}
          />
          <small className="text-[#FF4B2B] text-xs font-medium my-2">
            {errors?.accountName?.message}
          </small>
        </div>

        <div className=" w-full mt-4">
          {/* ======get amount ====== */}
          <CustomeInput
            lable={<p>Amount : </p>}
            type={"number"}
            name={"amount"}
            placeholder={"Enter Amount"}
            regester={register("amount", { required: "Amount is required" })}
            onKeyUp={(e) => {
              trigger("amount");
            }}
          />
          <small className="text-[#FF4B2B] text-xs font-medium my-2">
            {errors?.amount?.message}
          </small>
        </div>

        <div className=" w-full mt-4 relative">
          <label htmlFor="name" className="leading-7 text-sm font-bold ">
            <p>Select Background Color :</p>
          </label>
          <div
            onClick={() => setShow((pre) => !pre)}
            className=" shadow-sm border outline-none  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg"
          >
            <div
              style={{ background: bgColor }}
              className="w-full h-[30px] cursor-pointer rounded-lg"
            ></div>
          </div>

          {show && (
            <div className=" border absolute top-[80px] left-0 right-0 bg-white p-3 rounded-lg max-h-[160px] overflow-y-scroll grid md:grid-cols-1 gap-3 grid-cols-1 mt-2 ">
              {colors.map((color, index) => {
                return (
                  <div
                    onClick={() => {
                      setBgColor(color.name);
                      setShow(false);
                    }}
                    style={{ background: color.name }}
                    key={index}
                    className={`w-full h-[30px] cursor-pointer rounded-lg`}
                  ></div>
                );
              })}
            </div>
          )}
        </div>
        <div className=" mt-10 mb-5">
          <button type="submit" className={`btn bg-primary text-white `}>
            {loading ? <CustomButtonLoading /> : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBalance;
