import React from 'react'
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { useState } from 'react';
import { ModalUpdateMethodHook } from '../../../../../lib/usePostHooks';
import { server_url_v2 } from '../../../../../lib/config';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';



const BalanceUpdate = ({ refetch, modalheiden, account }) => {
  const [loading, setLoading] = useState(false)
  const [bgColor, setBgColor] = useState(account.bgColor)
  const [show, setShow] = useState(false)
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      amount: account.amount
    }
  });


  

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
  ]

  const addAcount = (data) => {
    const url = `${server_url_v2}/accounts/opening-balance/${account._id}`
    const body = {
      historyTitle: data.historyTitle,
      amount: Number(data.amount),
      bgColor,
    }
    ModalUpdateMethodHook(url, body, refetch, setLoading, modalheiden)
  }

  return (
    <div className='md:w-[800px] w-full '>
      <h2 className=' text-[25px] font-bold'>Balance Update: <span className=' text-primary'>{account.accountName}</span></h2>
      <form onSubmit={handleSubmit(addAcount)} className='mt-5 border p-3 md:p-6 rounded-md'>
        <div className="w-full md:mt-4">
          <label htmlFor="name" className="leading-7 text-sm font-bold ">
            Note
          </label>
          <textarea
            name={"historyTitle"}
            placeholder={"Enter Note..."}
            {...register("historyTitle", { required: "Note is required", })}
            onKeyUp={(e) => { trigger("historyTitle") }}
            className='shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg'></textarea>
          <small className="text-[#FF4B2B] text-xs font-medium my-2">
            {errors?.historyTitle?.message}
          </small>
        </div>

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

        <div className=' w-full mt-4 relative'>
          <label htmlFor="name" className="leading-7 text-sm font-bold ">
            <p>Select Background Color :</p>
          </label>
          <div onClick={() => setShow((pre) => !pre)} className=' shadow-sm border outline-none  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg'>
            <div style={{ background: bgColor }} className='w-full h-[30px] cursor-pointer rounded-lg'></div>
          </div>

          {
            show && <div className=' border absolute top-[80px] left-0 right-0 bg-white p-3 rounded-lg max-h-[160px] overflow-y-scroll grid md:grid-cols-1 gap-3 grid-cols-1 mt-2 '>
              {
                colors.map((color, index) => {
                  return (
                    <div onClick={() => { setBgColor(color.name); setShow(false) }} style={{ background: color.name }} key={index} className={`w-full h-[30px] cursor-pointer rounded-lg`}></div>
                  )
                })
              }
            </div>
          }
        </div>
        <div className=' mt-10 mb-8'>
          <button type='submit' className={`btn bg-primary text-white `}>{loading ?<CustomButtonLoading/> : "Update Balance"}</button>
        </div>
      </form>
    </div>
  )
}

export default BalanceUpdate