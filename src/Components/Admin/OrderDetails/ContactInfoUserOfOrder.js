import React from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import SentToModal from "./SentToModal";
import { useState } from "react";
import { MdOutlineLocalShipping } from "react-icons/md"
import CustomTooltip from "../../../Shared/CustomTooltip";
import { Tooltip } from "react-tooltip";

const ContactInfoUserOfOrder = ({ order, status, refetch }) => {
  const { shippingAddress } = order
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold">Shipping Info</h2>
        <div>
          {/* ------------this button is for send order in courier-------------- */}

          <div>

            {
              // order.courierName === "not found" ? (
              status === "pending" ? (
                <div>
                  <Tooltip anchorSelect="#not-clickable">
                    Courier Management
                  </Tooltip>
                  <button id="not-clickable" disabled={status === "pending" ? false : true} onClick={() => setIsModalOpen(true)} className={`flex items-center justify-center gap-1  mb-2 mx-auto  font-bold px-2 rounded-md ${status === "pending" ? "cursor-pointer bg-primary text-white" : "bg-gray-200 text-gray-300 cursor-not-allowed"} ${order?.status === "cancelled" && 'hidden'}`}>
                    Send To
                    <MdOutlineLocalShipping size={20} className="" />
                  </button>
                </div>
              ) : (
                <div>
                  <Tooltip anchorSelect="#not-clickable">
                    Your Order Already In {order?.status}
                  </Tooltip>
                  <button id="not-clickable" disabled={order.courierName === "not found" ? false : true} onClick={() => setIsModalOpen(true)} className={`flex items-center justify-center gap-1 bg-primary mb-2 mx-auto text-white font-bold px-2 rounded-md ${order.courierName === "not found" ? "cursor-pointer" : " cursor-not-allowed"} ${order?.status === "cancelled" && 'hidden'}`}>
                    Send To
                    <MdOutlineLocalShipping size={20} className="" />
                  </button>
                </div>
              )
            }
          </div>

          <span
            className={`${status === "pending" && "bg-warning"} ${status === "processing" && "bg-info"
              } ${status === "delivered" && "bg-success"} ${status === "invoiced" && " bg-purple-500"} ${status === "cancelled" && "bg-red-700"
              } text-white font-bold px-2 rounded-md flex items-center justify-center uppercase text-sm`}
          >
            {status}
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 p-4 shadow-sm rounded-md mb-2">
          <div>
            <BiBuildingHouse className="w-12 h-12 p-3 rounded-full bg-info text-white" />
          </div>
          <div className="uppercase text-xs font-bold">
            <p>
              Name: {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            <p>
              {shippingAddress.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 shadow-sm rounded-md mb-2">
          <BsFillTelephoneFill className="w-12 h-12 p-3 rounded-full bg-warning text-white" />
          <div className="">
            <p className="font-bold">Phone</p>
            <p>{shippingAddress.phone}</p>
          </div>
        </div>
        <div >
          {shippingAddress?.email ? <div className="flex items-center gap-2 p-4 shadow-sm rounded-md mb-2"> <div className="w-12 h-12 ">
            <MdOutlineEmail className="w-12 h-12 p-3 rounded-full bg-success text-white" />
          </div>
            <div className="">
              <p className="font-bold">Email</p>
              <p>{shippingAddress?.email}</p>
            </div>
            </div>:
            <div className="flex items-center gap-2 p-4 shadow-sm rounded-md mb-2">
              <div className="w-12 h-12 ">
                <FaHome className="w-12 h-12 p-3 rounded-full bg-success text-white" />
            </div>
              <div className="">
                <p className="font-bold">Shipping Address</p>
                <p>{shippingAddress?.address}</p>
              </div>
            </div>
          }
        </div>
      </div>
      {/* ----------modal for sent to button---------------- */}
      <SentToModal
        modalIsOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        order={order}
        refetch={refetch}
      />
    </div>
  );
};

export default ContactInfoUserOfOrder;