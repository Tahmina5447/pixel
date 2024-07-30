import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../Shared/AddressInput/CustomeInput';
import swal from 'sweetalert';
import server_url from '../../../../lib/config';
import { updateMethodHook } from '../../../../lib/usePostHooks';


const SteadFast = ({ order, refetch, setIsOpen, siteApiSettingData }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm({
        defaultValues: {
            address: `${order?.shippingAddress.address} ${order?.shippingAddress.thana} ${order?.shippingAddress.city} ${order?.shippingAddress.postalCode}`
        }
    });

// -----------------steadFast api add-----------------------
    const onSubmitForm = (data) => {
        const steadFastData = {
            invoice: order?.invoiceNumber,
            recipient_name: order?.shippingAddress?.firstName + " " + order?.shippingAddress?.lastName,
            recipient_phone: order?.shippingAddress?.phone,
            recipient_address: data?.address,
            cod_amount: order?.afterDiscountPrice,
            note: data?.note
        }
        const url = `${siteApiSettingData?.data?.steadFastApiBaseUrl}/create_order`
        fetch(url, {
            method: "POST",
            headers: {
                "Api-Key": siteApiSettingData?.data?.steadFastApiKey,
                "Secret-Key": siteApiSettingData?.data?.steadFastSecretKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(steadFastData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    const url = `${server_url}/order/${order._id}`;
                    const body = { status: "processing", courierName: "steadfast" };
                    updateMethodHook(url, body, refetch);
                    setIsOpen(false)
                }
                else {
                    swal("error", "invoice add", "error")
                    console.log(data.error)
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)} className=' mt-5 border p-3 md:p-6 rounded-md '>
                <h2 className='font-bold text-xl uppercase'>Order Sent to SteadFast</h2>
                <div className=' flex flex-col w-full gap-5 mt-5'>
                    <div className=' w-full'>
                        {/* ======get Note====== */}
                        <CustomeInput
                            lable={<p>Note <small>ex:(Deliver within 3 PM)</small> </p>}
                            type={"text"}
                            name={"note"}
                            placeholder={"Enter Note"}
                            regester={register("note", { required: "Note is required", })}
                            onKeyUp={(e) => { trigger("note") }}
                        />
                        <small className="text-[#FF4B2B] text-xs font-medium my-2">
                            {errors?.note?.message}
                        </small>
                    </div>

                    <div className=' w-full'>
                        {/* ======get address====== */}
                        <div htmlFor="" className="w-full  ">
                            <label htmlFor="name" className="leading-4 md:leading-7 text-sm font-bold ">
                                <p>Address <small>ex:(Fla#A1, House#17/1, Road#3/A, Dhanmondi, Dhaka-1209)</small> </p>
                            </label>
                            <textarea
                                placeholder={"Enter Address"}
                                {...register("address", { required: "Address is required", })}
                                onKeyUp={(e) => { trigger("address") }}
                                className='shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg'
                            >
                            </textarea>



                            <small className="text-[#FF4B2B] text-xs font-medium my-2">
                                {errors?.address?.message}
                            </small>
                        </div>
                    </div>
                    <div className=''>
                        <button disabled={siteApiSettingData?.data?.steadFastSecretKey === " " && siteApiSettingData?.data?.steadFastApiKey === "" && treu} type='submit' className={`btn bg-primary text-white mb-5 ${siteApiSettingData?.data?.steadFastSecretKey === " " && siteApiSettingData?.data?.steadFastApiKey === "" && " cursor-not-allowed"}`}>Transfer Order</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default SteadFast;