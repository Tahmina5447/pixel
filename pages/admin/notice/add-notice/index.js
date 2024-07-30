import React, { useState } from 'react';
import DashboardLayout from '../../../../src/Components/DashboardLayout';
import AdminDashboardBreadcrumb from '../../../../src/Shared/AdminDashboardBreadcrumb';
import CustomButtonLoading from '../../../../src/Shared/CustomButtonLoading';
import { server_url_v3 } from '../../../../lib/config';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
const AddNotice = () => {
    const [loading,setLoading]=useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const addNotice = (data) => {
        setLoading(true)
        const info = {
            notice: data.notice,
        }

        const body = {
            modelName: 'Notice',
            body: info
        }
        fetch(`${server_url_v3}/custom`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if (data.status === 'success') {
                    swal("success", "Successfuly Notice Added", "success");
                    reset();
                    setLoading(false)

                }
                if (data.status === "fail") {
                    swal("error", data.message || data.error, "error");
                    setLoading(false)
                }
            });

    }
    return (
        <>
            <DashboardLayout>
                <AdminDashboardBreadcrumb
                    title={"Add Notice"}
                />
                <div className=' md:pr-10'>
                    <div className='w-full bg-white shadow-md my-5 rounded-md p-5'>
                        <div className='text-xl font-bold  py-5'>Add Notice:</div>
                        <form onSubmit={handleSubmit(addNotice)} className=" flex flex-col gap-4">
                            <div className='w-full md:flex gap-5'>
                                <div className="w-full ">
                                    <p className='mb-2'>Notice</p>
                                    <input
                                        type="text"
                                        {...register("notice", { required: true })}
                                        className=" py-4 border border-gray-400 rounded-md  px-5 bg-white input_Shadow w-full"
                                        placeholder="Notice "
                                    />
                                </div>

                            </div>


                            <div className=" my-3">
                                <button type='submit' className='px-4 py-2 bg-primary text-white rounded'>{loading ? <><CustomButtonLoading /></> : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AddNotice;