import React from 'react'
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { useState } from 'react';
import { ModalPostMethodHook, ModalUpdateMethodHook } from '../../../../../lib/usePostHooks';
import { base_url_v2 } from '../../../../../lib/helper';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertTimestamp, convertTimestamp2 } from '../../../../../lib/convertTimestampDateAndTime';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';




const UpdateExpenseChild = ({ setIsOpen, rowrefetch, item }) => {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
    setValue
  } = useForm(

    );

  const convertToYYYYMMDD = (originalDate) => {
    const dateObject = new Date(originalDate);
    const year = dateObject.getFullYear();
    const month = `${dateObject.getMonth() + 1}`.padStart(2, '0');
    const day = `${dateObject.getDate()}`.padStart(2, '0');
    return `${month}/${day}/${year}`;
  };


  useEffect(() => {
    setValue("accountName", item?.title);
    setValue("payableDate", convertToYYYYMMDD(item?.payableDate));
    setValue("amount", item?.amount);
  }, [item])


  const addAcount = (data) => {
    const url = `${base_url_v2}/expense-calculate-sub-item/${item._id}`
    // const formattedDate = convertTimestamp2(selectedDate);
    const { date, time } = convertTimestamp(selectedDate);
    const body = {
      title: data.accountName,
      payableDate: date,
      amount: data.amount,
    }
    ModalUpdateMethodHook(url, body, rowrefetch, setLoading, setIsOpen)
  }

  return (
    <div className='md:w-[800px] w-full py-5'>
      <h2 className=' text-[25px] font-bold'>Change Expense Date:</h2>
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
            ======get date ======
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
        </div>

        <div className=' mt-10 mb-5'>
          <button type='submit' className={`btn bg-primary text-white `}>{loading ?<CustomButtonLoading/> : "Save"}</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateExpenseChild