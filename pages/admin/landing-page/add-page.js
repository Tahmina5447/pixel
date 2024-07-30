import React from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import dynamic from "next/dynamic";
import { useForm } from 'react-hook-form';
import { BsCloudUploadFill } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { handleMultiImageUpload } from '../../../lib/imageUploader';
import { base_url_v2 } from '../../../lib/helper';
import swal from 'sweetalert';
import { useState } from 'react';
import { postMethodHook } from '../../../lib/usePostHooks';
import SelectProduct from '../../../src/Components/Admin/CustomOrder/SelectProduct';
import ProductDrawer from '../../../src/Shared/drawer/ProductDrawer';
import AddedProduct from '../../../src/Components/Admin/LandingPage/AddedProduct';
import CustomButtonLoading from '../../../src/Shared/CustomButtonLoading';
import Image from "next/image";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const addPage = () => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState([]);
    // -------------------total price of product-----------------------
    const [totalPriceOfCartItem, setTotalPriceOfCartItem] = useState(0);
    const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
    // ---------------------here will get single products ( array of object) -----------------
    const [getProductId, setGetProductId] = useState([])
    const [richText, setValueOfRichText] = useState("");
    const [show, setShow] = useState(false)


    // use for open cart drawer
    const toggleDrawer = () => {
        setShow(!show);
    };


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    // --------------------------------------------handle multi image upload
    const handleImageUpload = (e) => {
        handleMultiImageUpload(
            e,
            imageUrl,
            setImageUrl,
            setImageUploadErrorMessage
        );
    };

    const addLandingPage = (data) => {
        setLoading(true)
        const body = {
            title1: data.title1,
            title2: data.title2,
            YouTube: data.youtube,
            shortDes: data.shortDes,
            galleryTitle: data.galleryTitle,
            galleryImages: imageUrl,
            features: richText,
            featureTitle: data.featuresTitle,
            packagePrice: totalPriceOfCartItem,
            discount: 0,
            products: getProductId
        }

        // ----------------post here-------------------------
        const url = `${base_url_v2}/landing-page`
        postMethodHook(url, body, reset, setLoading)

    }

    // -----------------for control react-quill--------------------
    const modules = {
        toolbar: [
            [{ list: 'bullet' }],
        ],
    };
    return (
        <>
            <DashboardLayout>
                <div className='my-10 flex-col-reverse flex lg:flex-row   gap-5'>
                    {/* ------------------add other information----------- */}
                    <div className='w-full rounded-md shadow p-5'>
                        <form
                            onSubmit={handleSubmit(addLandingPage)}
                            className="flex flex-col gap-5"
                        >
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Title 1</p>
                                <textarea
                                    type="text"
                                    {...register("title1", { required: true })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                // onChange={convertToUrlPath}
                                >

                                </textarea>
                            </div>
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Title 2</p>
                                <textarea
                                    type="text"
                                    {...register("title2", { required: true })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                // onChange={convertToUrlPath}
                                >

                                </textarea>
                            </div>
                            <div className="w-full">
                                <p className='text-sm font-bold mb-1'>Youtube Url</p>
                                <input
                                    type="text"
                                    {...register("youtube", { required: true })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div>

                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Short Description</p>
                                <textarea
                                    type="text"
                                    {...register("shortDes", { required: true })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                >

                                </textarea>
                            </div>

                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Gallery Title</p>
                                <input
                                    type="text"
                                    {...register("galleryTitle", { required: true })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div>

                            {/* ---------------gallery images----------------- */}
                            <div className="w-full">
                                <p className='text-sm font-bold mb-1'>Gallery Images</p>
                                <div className="">
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

                                    <div className="flex flex-wrap gap-2">
                                        {imageUrl.map((img, index) => {
                                            return (
                                                <div
                                                    className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 "
                                                    key={index}
                                                >
                                                    <Image
                                                        src={img}
                                                        width="100"
                                                        height="2"
                                                        alt="category image"
                                                        className="w-full h-full object-contain "
                                                    />
                                                </div>
                                            );
                                        })}
                                        <div className="relative w-[100px] h-[100px] p-1 bg-white shadow-md rounded-md mt-3 flex justify-center items-center">
                                            <span>
                                                <BiImageAdd
                                                    onChange={handleImageUpload}
                                                    size={45}
                                                    className="text-primary cursor-pointer hover:text-slate-700"
                                                />
                                                <input
                                                    type="file"
                                                    onChange={handleImageUpload}
                                                    className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Features Title</p>
                                <input
                                    type="text"
                                    {...register("featuresTitle", { required: true })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div>

                            <div className="w-full">
                                <p className='text-sm font-bold mb-1'>Features</p>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={richText}
                                        onChange={setValueOfRichText}
                                        style={{ height: 200, marginBottom: 12 }}
                                    />
                                </div>
                            </div>


                            {/* <div className="w-full mt-6">
                                <p className='text-sm font-bold mb-1'>Product Price</p>
                                <input
                                    disabled
                                    defaultValue={totalPriceOfCartItem}
                                    type="number"
                                    {...register("productPrice", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div> */}
                            {/* <div className="w-full mt-6">
                                <p className='text-sm font-bold mb-1'>Discount</p>
                                <input
                                    type="number"
                                    {...register("discount", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div> */}
                            <div className='flex justify-end mt-10'>
                                <button type='submit' className=' bg-primary rounded px-2 py-1 text-white'>{(loading) ? <CustomButtonLoading /> : 'Save'}</button>
                            </div>
                        </form>
                    </div>

                    {/* ---------------------select product--------------- */}
                    <div className='w-full rounded-md shadow p-5'>
                        <div className=''>
                            <SelectProduct setGetProductId={setGetProductId} setShow={setShow} getProductId={getProductId} />
                        </div>
                        <div className='mt-4'>
                            <AddedProduct setTotalPriceOfCartItem={setTotalPriceOfCartItem} totalPriceOfCartItem={totalPriceOfCartItem} getProductId={getProductId} setGetProductId={setGetProductId} />
                        </div>

                    </div>
                </div>

            </DashboardLayout>

            {/* ----------------all product drawer with search-------------------- */}
            <ProductDrawer
                isOpen={show}
                toggleDrawer={toggleDrawer}
                dir={"right"}
                setGetProductId={setGetProductId}
                getProductId={getProductId}
            />
        </>
    );
};

export default addPage;