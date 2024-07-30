import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { base_url_v2 } from "../../../../../lib/helper";
import {
  ModalUpdateMethodHook,
  deleteMethod,
} from "../../../../../lib/usePostHooks";
import CustomModal from "../../../../Shared/CustomModal";
import { useState } from "react";
import UpdateExpenseChild from "./UpdateExpenseChild";
import AddExpense from "../Category/AddExpense";

const CalculateItemCard = ({ item, rowrefetch }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item._id,
    data: {
      type: "Task",
      item,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div className=" rounded-md min-h-[100px] drop-shadow-md bg-gray-300 py-3 px-3 flex items-center gap-1 justify-between"></div>
    );
  }

  const deleteList = () => {
    const url = `${base_url_v2}/expense-calculate-sub-item/${item._id}`;
    deleteMethod(url, rowrefetch);
  };

  const updatePaid = (paid) => {
    const url = `${base_url_v2}/expense-calculate-sub-item/${item._id}`;
    const body = {
      isPaid: paid === "paid" ? "unpaid" : "paid",
    };
    ModalUpdateMethodHook(url, body, rowrefetch, () => {}, setShowEdit);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`rounded-md drop-shadow-md py-3 px-3 flex items-start flex-col gap-1 justify-between ${
          item.isPaid === "paid"
            ? " bg-white text-black"
            : " bg-white text-black"
        }`}
      >
        <div className=" w-full ">
          <h2 className=" text-[15px] font-serif ">{item?.title}</h2>
          <h2 className=" text-[14px] font-semibold">৳{item.amount}</h2>
          {/* <h3 className=' text-[13px] '>Pay Date : {item.payableDate}</h3> */}
        </div>
        <div className=" flex items-center justify-between w-full">
          <div className=" flex items-center gap-1 justify-between">
           
              <Icon icon="mdi:drag" className=" text-[20px] mr-2"/>{" "}

            {item.isPaid==="unpaid" && <button
              onClick={() => setShowEdit(true)}
              className=" text-[16px] text-green-700"
            >
              <Icon icon="bxs:edit" />
            </button>}
            <button
              onClick={() => deleteList()}
              className=" text-[16px] text-red-500 hover:text-red-600"
            >
              <Icon icon="ic:outline-delete" />
            </button>
            {item.isPaid==="unpaid" && <h3 className=' text-[13px] pl-2 '>Pay Date :{item.payableDate}</h3>}
          </div>
        {
          item.isPaid==="unpaid" ? <button onClick={()=>setAddExpenseModalOpen(true)} className="py-1 px-2 bg-primary text-white text-[13px] hover:bg-primary/70 rounded-md">Pay</button>    : <div className='flex items-center gap-1'>
          <h2 className='text-[13px] font-bold'>Paid</h2>
      </div>
        }
        </div>
      </div>
      {/* =======edit data modale=======  */}
      <CustomModal modalIsOpen={showEdit} setIsOpen={setShowEdit}>
        <UpdateExpenseChild
          setIsOpen={setShowEdit}
          rowrefetch={rowrefetch}
          item={item}
        />
      </CustomModal>

      {/* pay data modale */}

      <CustomModal
        modalIsOpen={addExpenseModalOpen}
        setIsOpen={setAddExpenseModalOpen}
      >
        <AddExpense
          setAddExpenseModalOpen={setAddExpenseModalOpen}
          amount={item?.amount}
          title={item?.title}
          id={item?._id}
          rowrefetch={rowrefetch}
        />
      </CustomModal>
    </>
  );
};

export default CalculateItemCard;
