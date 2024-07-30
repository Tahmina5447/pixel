import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import swal from "sweetalert";
import DashboardLayout from '../../../src/Components/DashboardLayout';
import { server_url_v3 } from '../../../lib/config';
import AdminDashboardBreadcrumb from '../../../src/Shared/AdminDashboardBreadcrumb';
import { BsCloudUploadFill } from 'react-icons/bs';
import CustomButtonLoading from '../../../src/Shared/CustomButtonLoading';
import Image from 'next/image';
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const UpdateMagazine = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [richText, setValueOfRichText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const id = router.query.id;
    // console.log(id)
    const { data, refetch, isLoading } = useQuery({
        queryKey: ["data",id],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom/${id}?modelName=Blog`
            ).then((res) => res.json()),
    });
    const magazine = data?.data

    useEffect(() => {
        if (magazine) {
            setImageUrl(magazine?.image);
            setValueOfRichText(magazine?.description);
        }
    }, [id]);

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
    const updateMagazine = (data) => {
        if (!imageUrl) {
            return swal("error", "Please add an image", "error");
        }
        setLoading(true)
        const info = {
            title: data?.title ||magazine?.title,
            description: richText,
            image: imageUrl,
            shortDes:data?.shortDes||magazine?.shortDes

        }
        const body = {
            modelName: 'Blog',
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
                    swal("success", "Successfuly Blog Updated", "success");
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
                    title={"Update Blog"}
                />
                {
                    isLoading ? <>
                    loading
                    </> : <>
                        <form
                            onSubmit={handleSubmit(updateMagazine)}
                            className="mt-5 px-2 md:px-7"
                        >
                            <div className="block md:flex gap-5 mb-4">
                                <div className="w-[30%] text-lg font-semibold mt-3">
                                    <p>Blog Image:</p>
                                </div>
                                <div className="w-full md:w-[70%]  ">
                                    <div className="relative border-4 border-dashed w-full h-[150px]  text-center">
                                        <BsCloudUploadFill
                                            size={35}
                                            className="text-primary mx-auto block  mt-8"
                                        />
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
                                    {imageUrl && <>
                                        <Image
                                            src={imageUrl}
                                            width={200}
                                            height={50}
                                            className='w-[100px] h-[100px] rounded mt-2'
                                        />

                                    </>}
                                </div>
                            </div>

                            <div className="block md:flex items-center gap-5 mb-4">
                                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                                    <p>Title:</p>
                                </div>
                                <div className="w-full md:w-[70%]">
                                    <input
                                        defaultValue={magazine?.title}
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
                                        className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                        placeholder="Blog Title"
                                    />
                                    
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                                </div>
                            </div>
                            <div className="block md:flex gap-5 mb-4">
                                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                                    <p>Short Descriptions:</p>
                                </div>
                                <div className="w-full md:w-[70%]">
                                <textarea
                                    defaultValue={magazine?.shortDes}
                                        type="text"
                                        {...register("shortDes", { required: true })}
                                        className=" py-4 border border-gray-400 rounded-md  px-5 bg-white input_Shadow w-full"
                                        placeholder="Short Descriptions "
                                        rows={3}
                                    />
                                </div>
                            </div>
                            

                            <div className="block md:flex gap-5 mb-4">
                                <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
                                    <p>Description:</p>
                                </div>
                                <div className="w-full md:w-[70%]">
                                    <ReactQuill
                                        theme="snow"
                                        value={richText}
                                        onChange={setValueOfRichText}
                                        style={{ height: 200, marginBottom: 12 }}
                                    />
                                    ;
                                </div>
                            </div>

                            <div className="flex justify-end items-center gap-5 mb-4">
                                <button className="btn btn-primary ml-auto text-white">{(loading) ? <CustomButtonLoading /> : 'Update Blog'}</button>
                            </div>
                        </form>
                    </>
                }

            </DashboardLayout>
        </>
    );
};

export default UpdateMagazine;