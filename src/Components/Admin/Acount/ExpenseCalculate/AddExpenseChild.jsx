import React from 'react'
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { useState } from 'react';
import { ModalPostMethodHook } from '../../../../../lib/usePostHooks';
import { base_url_v2 } from '../../../../../lib/helper';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';



const AddExpenseChild = ({ setIsOpen, rowrefetch, expense }) => {
  const [loading, setLoading] = useState(false)
  const [selectedDate,setSelectedDate]=useState(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();


  const addAcount = (data) => {
    const url = `${base_url_v2}/expense-calculate-sub-item`;
    const { date, time } = convertTimestamp(selectedDate);
    const body = {
      title: data.accountName,
      payableDate: date,
      amount: data.amount,
      parentId: expense._id,
    }

    ModalPostMethodHook(url, body, rowrefetch, setLoading, setIsOpen)
  }

  return (
    <div className='md:w-[800px] w-full py-5'>
      <h2 className=' text-[25px] font-bold'>Add Expense :</h2>
      <form onSubmit={handleSubmit(addAcount)} className='mt-5 border p-3 md:p-6 rounded-md'>
        <div className=' w-full'>
          {/* ======get Account Name====== */}
          <CustomeInput
            lable={<p>title : </p>}
            type={"text"}
            name={"accountName"}
            placeholder={"Enter Account Name"}
            regester={register("accountName", { required: "Account Name is required", })}
            onKeyUp={(e) => { trigger("accountName") }}
          />
          <small className="text-[#FF4B2B] text-xs font-medium my-2">
            {errors?.accountName?.message}
          </small>
        </div>

        <div className=' flex items-center justify-between flex-col gap-5 md:flex-row'>
          <div className=' w-full mt-4'>
            {/* ======get amount ====== */}
            <CustomeInput
              lable={<p>Amount : </p>}
              type={"number"}
              name={"amount"}
              placeholder={"Enter Amount"}
              regester={register("amount", { required: "Amount is required", })}
              onKeyUp={(e) => { trigger("amount") }}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.amount?.message}
            </small>
          </div>

          <div id='modal_date' className="w-full mt-4">
            <p className='text-sm mb-1 font-bold'>Payable Date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              required
              placeholderText="Select Date"
              className="w-full border border-gray-300 rounded-md pl-2 pr-8 py-2.5 "
            />
          </div>
          {/* <div className=' w-full mt-4'>
            <CustomeInput
              lable={<p>Payable Date : </p>}
              type={"date"}
              name={"payableDate"}
              placeholder={"Enter Amount"}
              regester={register("payableDate", { required: "payable Date is required", })}
              onKeyUp={(e) => { trigger("payableDate") }}
            />
            <small className="text-[#FF4B2B] text-xs font-medium my-2">
              {errors?.payableDate?.message}
            </small>
          </div> */}

          {/* <div className=" w-full">
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div> */}
        </div>

        <div className=' mt-10 mb-5'>
          <button type='submit' className={`btn bg-primary text-white `}>{loading ? <CustomButtonLoading/> : "Save"}</button>
        </div>
      </form>
    </div>
  )
}

export default AddExpenseChild