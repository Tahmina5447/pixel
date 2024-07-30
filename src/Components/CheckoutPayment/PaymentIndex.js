
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import BkashPayment from "./BkashPayment";
import { AiOutlineRollback } from "react-icons/ai";
import { usePostOrder } from "../../../lib/usePostOrder";
import server_url from "../../../lib/config";
import CreateContext from "../CreateContex";
import Link from "next/link";
import Image from "next/image";
const PaymentIndex = ({ order ,setIsOpen,orderItem="",setPaymentDetailsLast}) => {
  const [method, setMethod] = useState("");
  const [isClickMethod, setIsClickMethod] = useState(false);
  const { setOrderResponse ,setlocalStorageCartItems} = useContext(CreateContext);

  const router = useRouter();

  const onSubmitOrder = (data) => {
    if (data === "bkash") {
      order.paymentDetails = {
        method: "bkash",
      };
    } else {
      order.paymentDetails = {
        method: "cod",
      };
    }
    order.paymentDetails = {
      method: "cod",
    };

    // const url = `${server_url}/order`;
    // usePostOrder(url, order, setOrderResponse, router);
    
    // if(orderItem==="true"){
    //   setlocalStorageCartItems(0);
    //   localStorage.removeItem("shopping-cart");
    // }

  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold uppercase flex items-center">
        {isClickMethod && (
          <span
            onClick={() => {
              setIsClickMethod(false);
              setMethod("");
            }}
            className="cursor-pointer mr-2 bg-red-600 hover:bg-primary hover:text-black text-white duration-200"
          >
            <AiOutlineRollback />
          </span>
        )}{" "}
        Payment Method
      </h2>
      <span className="divider -mt-1"></span>
      {!isClickMethod && (
        <div className=" flex flex-wrap justify-center gap-2 md:gap-5 mb-3">

          {/* <Image
            onClick={() => {
              setMethod("cod");
              onSubmitOrder("cod");
            }}
            src={"/assets/cod.jpg"}
            alt="cod"
            width={1000}
            height={700}
            className="md:w-20 w-16 h-16 md:h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-4 p-2"
          /> */}
          <Link href={'#'}>
            <Image
              onClick={() => {
                setMethod("bkash");
                setIsClickMethod(true);
              }}
              src={"/assets/bkash.png"}
              alt="bkash"
              width={200}
              height={200}
              className="md:w-20 w-16 h-16 md:h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
            /></Link>
          {/* <Image
            onClick={() => {
              setMethod("rocket");
              setIsClickMethod(true);
            }}
            width={200}
            height={200}
            src={"/assets/rocket.png"}
            alt="cod"
            className="md:w-20 w-16 h-16 md:h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
          /> */}
          <Image
            onClick={() => {
              setMethod("nagad");
              setIsClickMethod(true);
            }}
            src={"/assets/nogod.png"}
            alt="nagad"
            width={200}
            height={200}
            className="md:w-20 w-16 h-16 md:h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
          />
        </div>
      )}
      {(method === "bkash" || method === "rocket" || method === "nagad") && (
        <BkashPayment method={method} order={order} setPaymentDetailsLast={setPaymentDetailsLast} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default PaymentIndex;
