import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import AdminDashboardBreadcrumb from '../../../src/Shared/AdminDashboardBreadcrumb';
import CustomButtonLoading from '../../../src/Shared/CustomButtonLoading';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { server_url_v3 } from '../../../lib/config';
import { useQuery } from 'react-query';
import swal from 'sweetalert';
const UpdateNotice = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const id = router.query.id;
    // console.log(id)
    const { data, refetch, isLoading } = useQuery({
        queryKey: ["data"],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom/${id}?modelName=Notice`
            ).then((res) => res.json()),
    });
    const notice = data?.data


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const updateNotice = (data) => {
        setLoading(true)
        const info = {
            notice: data?.notice,

        }
        const body = {
            modelName: 'Notice',
            body: info
        }
        fetch(`${server_url_v3}/custom/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    refetch();
                    swal("success", "Successfuly Notice Updated", "success");
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
                    title={"Update Notice"}
                />
                {
                    isLoading ? <>
                        loading
                    </> : <>

                        <div className=' md:pr-10'>
                            <div className='w-full bg-white shadow-md my-5 rounded-md p-5'>
                                <div className='text-xl font-bold  py-5'>Update Notice</div>
                                <form onSubmit={handleSubmit(updateNotice)} className=" flex flex-col gap-4">
                                    <div className='w-full md:flex gap-5'>
                                        <div className="w-full ">
                                            <p className='mb-2'>Notice:</p>
                                            <input
                                                type="text"
                                                defaultValue={notice?.notice}
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
                    </>
                }

            </DashboardLayout>
        </>
    );
};

export default UpdateNotice;