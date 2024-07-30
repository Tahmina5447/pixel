import React from "react";
import { FaCopy } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import server_url from "../../../lib/config";
import { usePostOrder } from "../../../lib/usePostOrder";
import { useContext } from "react";
import CreateContext from "../CreateContex";
import { useMyShopData } from "../../hooks/useMyShopData";

const BkashPayment = ({ method, order,setPaymentDetailsLast ,setIsOpen}) => {
  const [bkashNumber, setBkashNumber] = useState("01752898448");
  const [rocketNumber, setRocketNumber] = useState("");
  const [nagadNumber, setNagadNumber] = useState("01752898448");
  const { data } = useMyShopData();
  const [loading,setLoading]=useState(false)

  const { orderResponse, setOrderResponse } = useContext(CreateContext);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
     const paymentDetails = {
      method: method,
      number: data.paymentNumber,
      trxId: data.paymentTrxNumber,
    };
    setPaymentDetailsLast(paymentDetails)
    setIsOpen(false)

    // const url = `${server_url}/order`;
    // usePostOrder(url, order, setOrderResponse, router,setLoading);
  };

  const handleCopy = () => {
    if (method.includes("bkash")) {
      navigator.clipboard.writeText(data?.data?.bKash);
    } else if (method.includes("rocket")) {
      navigator.clipboard.writeText(data?.data?.rocket);
    } else if (method.includes("nagad")) {
      navigator.clipboard.writeText(data?.data?.nagad);
    }
    toast.success("Number Copied");
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`pt-4 bg-gradient-to-r ${method === "bkash"
          ? "from-[#e44f83] to-[#db2766]"
          : method === "rocket"
            ? "from-[#9d3fa1] to-[#8d1194]"
            : method === "nagad"
              ? "from-[#e63b41] to-[#e71017]"
              : ""
          }`}
      >
        <h1 className="text-center text-xl font-medium text-white">
          Enter {method} Transaction Id
        </h1>
        <div className="text-center flex flex-col">
          <input
            className="w-1/2 mx-auto py-2 px-3 text-center border border-transparent focus:border focus:border-blue-400 outline-none rounded-sm mt-5"
            type="number"
            placeholder="Enter Your Phone"
            {...register("paymentNumber", {
              required: "Phone number is required",
              minLength: {
                value: 11,
                message: "Please enter a valid phone number",
              },
              maxLength: {
                value: 11,
                message: "Please enter  11 digit phone number",
              },
            })}
            onKeyUp={(e) => {
              trigger("paymentNumber");
            }}
          />
          <small className="text-white mt-1 pl-1 text-[12px]">
            {errors?.paymentNumber?.message}
          </small>
        </div>
        <div className="text-center flex flex-col">
          <input
            className="w-1/2 mx-auto py-2 px-3 text-center border border-transparent focus:border focus:border-blue-400 outline-none rounded-sm mt-5"
            type="text"
            placeholder="Enter Transaction Id"
            {...register("paymentTrxNumber", {
              required: true,
              message: "Transaction Id is required",
            })}
            onKeyUp={(e) => {
              trigger("paymentTrxNumber");
            }}
          />
          <small className="text-white mt-1 pl-1 text-[12px]">
            {errors?.paymentTrxNumber?.message}
          </small>
        </div>

        <ul className="text-white py-4 px-7">
          <li className="text-justify">
            ১){" "}
            {method === "bkash"
              ? "*247#"
              : method === "rocket"
                ? "*322#"
                : method === "nagad"
                  ? "*167#"
                  : ""}{" "}
            ডায়াল করে আপনার{" "}
            {method === "bkash"
              ? "বিকাশ"
              : method === "rocket"
                ? "রকেট"
                : method === "nagad"
                  ? "নগদ"
                  : ""}{" "}
            মোবাইল মেনুতে যান অথবা{" "}
            {method === "bkash"
              ? "বিকাশ"
              : method === "rocket"
                ? "রকেট"
                : method === "nagad"
                  ? "নগদ"
                  : ""}{" "}
            অ্যাপে যান।
          </li>
          <li className="text-justify">
            ২){" "}
            <span className="text-lg font-semibold text-yellow-300">
              {method === "bkash"
              ? "Payment"
              : method === "rocket"
                ? "সেন্ড মানি "
                : method === "nagad"
                  ? "সেন্ড মানি"
                  : ""}
            </span>{" "}

            {method === "bkash"? "- অপশন সিলেক্ট করুন।" : "- তে ক্লিক করুন।"}
            
          </li>
          <li className="text-justify flex items-center">
            ৩) প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুনঃ{" "}
            <span className="flex ml-2 items-center text-lg font-semibold text-yellow-300">
              {method === "bkash"
                ? data?.data?.bKash
                : method === "rocket"
                  ? data?.data?.bKash
                  : method === "nagad"
                    ? data?.data?.bKash
                    : ""}
              <FaCopy onClick={handleCopy} className="ml-2 cursor-pointer" />
            </span>
          </li>
          <li className="text-justify flex items-center">
            ৪) টাকার পরিমাণঃ{" "}
            <span className="text-lg font-semibold text-yellow-300 ml-2">
              {order.totalAmount}TK
            </span>
          </li>
          <li className="text-justify flex items-center">
            ৫) এখন নিশ্চিত করতে আপনার{" "}
            {method === "bkash"
              ? "বিকাশ"
              : method === "rocket"
                ? "রকেট"
                : method === "nagad"
                  ? "নগদ"
                  : ""}{" "}
            পিন লিখুন।
          </li>
          <li className="text-justify flex items-center">
            ৬) সবকিছু ঠিক থাকলে, আপনি{" "}
            {method === "bkash"
              ? "বিকাশ"
              : method === "rocket"
                ? "রকেট"
                : method === "nagad"
                  ? "নগদ"
                  : ""}{" "}
            থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।
          </li>
          <li className="text-justify flex items-center">
            ৭) এখন উপরের প্রথম বক্সে আপনার ফোন নাম্বার এবং দ্বিতীয় বক্সে
            "Transaction ID" দিন আর নিচের "VERIFY" বাটনে ক্লিক করুন।
          </li>
        </ul>
        <button className="w-full py-3 text-xl font-bold text-gray-600 bg-white hover:bg-base-200 duration-200">
           {loading ? "Loading..." :"VERIFY" }
        </button>
      </form>
    </div>
  );
};

export default BkashPayment;
