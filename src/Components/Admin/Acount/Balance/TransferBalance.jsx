import React from 'react'
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { useState } from 'react';
import { ModalUpdateMethodHook } from '../../../../../lib/usePostHooks';
import { useEffect } from 'react';
import { server_url_v2 } from '../../../../../lib/config';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';



const TransferBalance = ({ refetch, modalheiden, account }) => {
    const [loading, setLoading] = useState(false)
    const [toAccount, setToAccount] = useState("");
    const [allAccount, setAllAccount] = useState()
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm();

    const tranceferBalance = (data) => {
        const url = `${server_url_v2}/accounts/balance-transfer`
        const body = {
            fromAccountId: account._id,
            toAccountId:toAccount,
            transferAmount: Number(data.amount),
        }

        
        ModalUpdateMethodHook(url, body, refetch,setLoading,modalheiden)
    }

    useEffect(() => {
        fetch(`${server_url_v2}/accounts/opening-balance`)
            .then((res) => res.json()) // <- Corrected line
            .then((data) => {
                const match = data?.data?.Accounts?.filter((aco) => aco._id !== account._id)
                setAllAccount(match);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [])


    const addAcount = (event) => {
        setToAccount(event.target.value);
    };

    return (
        <div className='md:w-[800px] w-full py-5'>
            <h2 className=' text-[25px] font-bold'>Trancefer Balance :</h2>
            <form onSubmit={handleSubmit(tranceferBalance)} className='mt-5 border p-3 md:p-6 rounded-md'>

                <div className=' flex items-center md:flex-row flex-col gap-5'>
                    <div className=' w-full relative'>
                        <label htmlFor="name" className="leading-7 text-sm font-bold ">
                            <p>from Acccount Name :</p>
                        </label>
                        <div className=' shadow-sm border outline-none  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg'>
                            {account?.accountName}
                        </div>
                    </div>
                    <div className=" w-full">
                        <label htmlFor="name" className="leading-7 text-sm font-bold ">
                            <p>To Acccount Name :</p>
                        </label>
                        <div className="w-full">
                            <select
                                onChange={addAcount}
                                value={toAccount}
                                className="select select-bordered w-full  focus:outline-none "
                                placeholder="Category"
                            // {...register("category", { required: true })}
                            >
                                <option selected hidden>
                                    Choose Account
                                </option>
                                {allAccount?.map((acco, index) => (
                                    <option value={acco._id} key={index}>
                                        {acco.accountName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

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


                <div className=' mt-10 mb-5'>
                    <button type='submit' className={`btn bg-primary text-white `}>{loading ? <CustomButtonLoading/> : "Trancefer Balance"}</button>
                </div>
            </form>
        </div>
    )
}

export default TransferBalance