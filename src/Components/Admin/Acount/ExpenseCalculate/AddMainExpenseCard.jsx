import React from 'react'
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { useState } from 'react';
import swal from 'sweetalert';
import { base_url_v2 } from '../../../../../lib/helper';
import { ModalPostMethodHook } from '../../../../../lib/usePostHooks';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';



const AddMainExpenseCard = ({setIsOpen,refetch}) => {
  const [loading,setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  const addAcount = (data)=>{
    const url = `${base_url_v2}/expense-calculate`
    const body = {
      title: data.accountName,
    }
   ModalPostMethodHook(url, body, refetch,setLoading,setIsOpen)
  }

  return (
    <div className='md:w-[800px] w-full py-5'>
      <h2 className=' text-[25px] font-bold'>Add Expense Card:</h2>
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
        <div className=' mt-10 mb-5'>
          <button type='submit' className={`btn bg-primary text-white `}>{loading ? <CustomButtonLoading/> : "Save"}</button>
        </div>
      </form>
    </div>
  )
}

export default AddMainExpenseCard