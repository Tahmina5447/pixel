
import Image from "next/image";
import QRCode from "qrcode.react";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";
import InvoiceTableItemRow from "../../Components/SuccessPayment/InvoiceTableItemRow";
import { useMyShopData } from "../../hooks/useMyShopData";

const InoviceOrderForUser = ({ order: orderResponse, dataRight }) => {
  const { date, time } = convertTimestamp(orderResponse.date);
  const componentRef = useRef();
  const { data, isLoading } = useMyShopData();



  return (
    <div>
    <div className="my-8">
      <div className="">
        <div className="flex md:flex-row items-center justify-between gap-2">
          <div className="">
            <ReactToPrint
              trigger={() => (
                <button className=" text-center btn btn-sm text-white capitalize btn-primary my-5">
                  <AiFillPrinter size={18} className="mr-1" /> Print/Download
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>

        <div className="h-full py-12  px-7" ref={componentRef}>
          <div className=" block md:flex justify-between ">
            <div>
              <h1 className="text-3xl font-extrabold uppercase text-black avenir2">
                INVOICE
              </h1>
              <div className="text-black/80">
                <h2 className=" ">Invoice No: {orderResponse?.invoiceNumber}</h2>
                <h2 className="">Date: {date}</h2>
              </div>
            </div>
            <div className="w-full md:w-1/3  md:my-0 my-8">
              {/* <h1 className="text-3xl font-extrabold uppercase text-black avenir2">Pixels</h1>
               */}
              <Image
                width={700}
                height={500}
                alt="logo"
                src={"/assets/mainlogo.png"}
                className="w-[120px] mb-3"
              />
              <div className="text-black/80">
                <h2 className=" ">01992636297</h2>
                <h2 className=""> Ground floor, The Grand Plaza Shopping Mall, Moghbazar Wireless, 227 Outer Circular Road Dhaka.</h2>
              </div>

            </div>
          </div>
          <div className="mt-4">
            <div className=" md:flex gap-3 justify-between">
              <div>
                <h1 className="text-3xl font-extrabold uppercase text-black avenir2">BILL TO:</h1>
                <div className="text-black text-lg">
                  <p className=" ">
                    {orderResponse?.shippingAddress?.firstName}{" "}
                    {orderResponse?.shippingAddress?.lastName}
                  </p>
                  <p className=" ">
                    {orderResponse?.shippingAddress?.phone}{" "}
                  </p>

                  <p className="">
                    {orderResponse?.shippingAddress?.address},{" "}
                    {orderResponse?.shippingAddress?.thana}{" "}
                    {orderResponse?.shippingAddress?.city}{" "}
                    {orderResponse?.shippingAddress?.postalCode}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3  md:my-0 my-8 flex flex-col justify-end">
                <h1 className="text-xl font-medium text-black ">Total Amount: ৳{orderResponse?.totalAmount}.00</h1>
                <h1 className="text-xl font-medium uppercase text-black">Payment Method: {orderResponse?.paymentDetails?.method}</h1>
              </div>
            </div>
            {/* date-invoice no- invoice to */}
            {/* ----------------table data of product items--------- */}
            <div className="my-5 mx-auto text-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-black text-lg text-white avenir2">
                    <tr className="text-left">
                      <th className="p-3">Item</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderResponse?.orderItem?.map((item, index) => (
                      <InvoiceTableItemRow
                        key={index}
                        index={index}
                        product={item}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* payment info */}
            <div className=" py-3 md:flex justify-end ">
              <div className="w-full md:w-2/5  ">
                <div className="flex text-xl font-medium text-black/80 items-end sm:items-center justify-between mb-1 avenir2">
                  <h2 className=" font-bold ">Delivery Charge:</h2>
                  <p className="font-bold text-slate-600">
                    ৳{orderResponse?.shippingPrice}.00
                  </p>
                </div>
                <div className="flex text-xl font-medium text-black/80 items-center justify-between mb-1 avenir2">
                  <h2 className=" font-bold ">Discount:</h2>
                  <p className=" font-bold text-slate-600">
                    ৳{orderResponse?.discount}.00
                  </p>
                  {orderResponse?.couponDiscount > 0 && (
                    <small className="text-success">
                      Here coupon discount {orderResponse?.couponDiscount}TK.
                    </small>
                  )}
                </div>
                <div className="flex text-2xl font-bold text-black items-center justify-between avenir2">
                  <h1 className=" font-bold ">Total:</h1>
                  <p className=" font-bold">
                    ৳{orderResponse?.totalAmount}.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default InoviceOrderForUser;
