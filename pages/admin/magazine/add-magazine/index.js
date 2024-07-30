import React, { useState } from 'react';
import { server_url_v3 } from '../../../../lib/config';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../../../src/Components/DashboardLayout';
import dynamic from "next/dynamic";
import swal from 'sweetalert';
import AdminDashboardBreadcrumb from '../../../../src/Shared/AdminDashboardBreadcrumb';
import CustomButtonLoading from '../../../../src/Shared/CustomButtonLoading';
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Descriptions from './../../../../src/Components/ProductsDetails/Descriptions/Descriptions';

const AddMagazine = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [richText, setValueOfRichText] = useState("");
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);
        fetch(imgUrl, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                setImageUrl(result.data?.url);

            });
    };

    const addMagazine = (data) => {
        if (!imageUrl) {
            return swal("error", "Please add an image", "error");
        }
        setLoading(true)
        const info = {
            title: data.title,
            description: richText,
            image: imageUrl,
            shortDes: data?.shortDes
        }

        const body = {
            modelName: 'Blog',
            body: info
        }
        console.log(body)
        fetch(`${server_url_v3}/custom`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    swal("success", "Successfuly Blog Added.", "success");
                    reset();
                    setValueOfRichText('')
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
                    title={"Add Blog"}
                />
                <div className=' md:pr-10'>
                    <div className='w-full bg-white shadow-md my-5 rounded-md p-5'>
                        <div className='text-xl font-bold  py-5'>Add Blog</div>
                        <form onSubmit={handleSubmit(addMagazine)} className=" flex flex-col gap-4">
                            <div className='w-full md:flex gap-5'>
                                <div className="w-full mb-3 md:mb-0">
                                    <p className='mb-2'>Title</p>
                                    <input
                                        type="text"
                                        {...register("title", {
                                            required: "Title is required",
                                            minLength: {
                                                value: 5,
                                                message: "Title must be at least 5 characters"
                                            },
                                            maxLength: {
                                                value: 300,
                                                message: "Title must not exceed 300 characters"
                                            }
                                        })}
                                        className="py-4 border border-gray-400 rounded-md px-5 bg-white input_Shadow w-full"
                                        placeholder="Title"
                                    />
                                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                                </div>
                                <div className="w-full ">
                                    <div className=''>
                                        <p className='mb-2'>Image:</p>
                                        <div className="relative border-4 border-dashed w-full h-[60px]  text-center">
                                            <p className="text-xl font-bold  text-slate-900">
                                                Drag your image here
                                            </p>
                                            <span className="text-xs font-bold text-slate-900">
                                                (Only *.jpeg and *.png images will be accepted)
                                            </span>
                                            <input
                                                type="file"
                                                onChange={handleImageUpload}
                                                className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    {imageUrl && (
                                        <div className='flex justify-center sm:justify-end '>
                                            <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ">
                                                <Image
                                                    src={imageUrl}
                                                    width="100"
                                                    height="2"
                                                    alt="category image"
                                                    className="w-full h-full object-contain "
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full ">
                                <p className='mb-2'>Short Descriptions</p>
                                <textarea
                                    type="text"
                                    {...register("shortDes", { required: true })}
                                    className=" py-4 border border-gray-400 rounded-md  px-5 bg-white input_Shadow w-full"
                                    placeholder="Short Descriptions "
                                    rows={3}
                                />
                            </div>
                            <div className=" relative">
                                <p className='mb-2'>Description</p>
                                <div className="w-full">
                                    <ReactQuill
                                        theme="snow"
                                        value={richText}
                                        onChange={setValueOfRichText}
                                        style={{ height: 200, marginBottom: 12 }}
                                    />
                                    ;
                                </div>
                            </div>

                            <div className=" text-center mb-3 mt-7 sm:mt-3">
                                <button type='submit' className='px-4 py-2 bg-primary text-white rounded'>{loading ? <><CustomButtonLoading /></> : 'Add Blog'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AddMagazine;