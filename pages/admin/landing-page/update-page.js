import { useRouter } from 'next/router';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { server_url_v2 } from '../../../lib/config';
import { useEffect } from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import SelectProduct from '../../../src/Components/Admin/CustomOrder/SelectProduct';
import AddedProduct from '../../../src/Components/Admin/LandingPage/AddedProduct';
import ProductDrawer from '../../../src/Shared/drawer/ProductDrawer';
import { useForm } from 'react-hook-form';
import { BsCloudUploadFill } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import Image from 'next/image';
import { updateMethodHook } from '../../../lib/usePostHooks';
import { base_url_v2 } from '../../../lib/helper';
import CustomButtonLoading from '../../../src/Shared/CustomButtonLoading';
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
const updatePage = () => {
    const router = useRouter();
    const id = router.query.id;
    const [loading, setLoading] = useState(false)
    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [YouTube, setYouTube] = useState('')
    const [shortDes, setShortDes] = useState('')
    const [galleryTitle, setGalleryTitle] = useState('')
    const [featureTitle, setFeatureTitle] = useState('')
    const [galleryImages, setGalleryImages] = useState([])
    const [features, setFeatures] = useState('')
    const [packagePrice, setPackagePrice] = useState(0)
    const [disCount, setDisCount] = useState(0)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState({})
    const [totalPriceOfCartItem, setTotalPriceOfCartItem] = useState(0);
    // -------------------show products when search/select---------------------
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

    const url = `${server_url_v2}/landing-page/${id}`
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.data) {
                    setPage(data?.data)
                    setTitle1(data?.data?.title1),
                        setTitle2(data?.data?.title2),
                        setYouTube(data?.data?.YouTube),
                        setShortDes(data?.data?.shortDes),
                        setGalleryTitle(data?.data?.galleryTitle),
                        setFeatureTitle(data?.data?.featureTitle),
                        setGalleryImages(data?.data?.galleryImages),
                        setFeatures(data?.data?.features),
                        setPackagePrice(data?.data?.packagePrice),
                        setDisCount(data?.data?.disCount),
                        setProducts(data?.data?.products)
                }
            });
    }, [id]);



    const updatePage = (data) => {
        setLoading(true)
        const body = {
            products: products,
            title1: data?.title1 || page?.title1,
            title2: data?.title2 || page?.title2,
            YouTube: data.youtube || page?.YouTube,
            shortDes: data.shortDes || page?.shortDes,
            galleryTitle: data.galleryTitle || page?.galleryTitle,
            galleryImages: galleryImages,
            features: features,
            featureTitle: data.featuresTitle || page?.featureTitle,
            packagePrice: totalPriceOfCartItem,
            discount: disCount,
        }
        const url = `${base_url_v2}/landing-page/${id}`
        updateMethodHook(url, body, setLoading)
    }
    // -----------------for control react-quill--------------------
    const modules = {
        toolbar: [
            [{ list: 'bullet' }],
        ],
    };


    // --------------------------------------------handle image upload
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
                if (result.data?.url) {
                    let newImageUrls = [...galleryImages];
                    newImageUrls.push(result.data?.url);
                    setGalleryImages(newImageUrls);
                }
            });
    };
    // ------------------------remove image-----------------------------
    const handleRemoveImage = (index) => {
        galleryImages.splice(index, 1);
    };
    return (
        <>
            <DashboardLayout>
                <div className='my-10 flex-col-reverse flex lg:flex-row   gap-5'>

                    {/* ------------------update other information----------- */}
                    <div className='w-full rounded-md shadow p-5'>
                        <form
                            onSubmit={handleSubmit(updatePage)}
                            className="flex flex-col gap-5"
                        >
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Title 1</p>
                                <textarea
                                    defaultValue={page?.title1}
                                    onChange={() => setTitle1(e.target.value)}
                                    type="text"
                                    {...register("title1", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"

                                >

                                </textarea>
                            </div>
                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Title 2</p>
                                <textarea
                                    defaultValue={page?.title2}
                                    type="text"
                                    {...register("title2", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"

                                >

                                </textarea>
                            </div>
                            <div className="w-full">
                                <p className='text-sm font-bold mb-1'>Youtube Url</p>
                                <input
                                    defaultValue={page?.YouTube}
                                    type="text"
                                    {...register("youtube", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div>

                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Short Description</p>
                                <textarea
                                    defaultValue={page?.shortDes}
                                    type="text"
                                    {...register("shortDes", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                >

                                </textarea>
                            </div>

                            <div className='w-full'>
                                <p className='text-sm font-bold mb-1'>Gallery Title</p>
                                <input
                                    defaultValue={page?.galleryTitle}
                                    type="text"
                                    {...register("galleryTitle", { required: false })}
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
                                        {galleryImages.map((img, index) => {
                                            return (
                                                <div
                                                    className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 relative"
                                                    key={index}
                                                >
                                                    <Image
                                                        src={img}
                                                        width="100"
                                                        height="2"
                                                        alt="category image"
                                                        className="w-full h-full object-contain "
                                                    />
                                                    <button
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="btn btn-outline btn-warning rounded-full bg-red-700 absolute right-0 top-0 btn-xs"
                                                    >
                                                        x
                                                    </button>
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
                                    defaultValue={page?.featureTitle}
                                    type="text"
                                    {...register("featuresTitle", { required: false })}
                                    className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                                />
                            </div>

                            <div className="w-full">
                                <p className='text-sm font-bold mb-1'>Features</p>
                                <div className="">
                                    <ReactQuill
                                        defaultValue={features}
                                        theme="snow"
                                        modules={modules}
                                        value={features}
                                        onChange={setFeatures}
                                        style={{ height: 200, marginBottom: 12 }}
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end mt-10'>
                                <button type='submit' className=' bg-primary rounded px-2 py-1 text-white'>{(loading) ? <CustomButtonLoading /> : 'Save'}</button>
                            </div>
                        </form>
                    </div>

                    {/* ---------------------update products--------------- */}
                    <div className='w-full rounded-md shadow p-5'>
                        <div className=''>
                            <SelectProduct setGetProductId={setProducts} setShow={setShow} getProductId={products} />
                        </div>
                        <div className='mt-4'>
                            <AddedProduct setTotalPriceOfCartItem={setTotalPriceOfCartItem} totalPriceOfCartItem={totalPriceOfCartItem} getProductId={products} setGetProductId={setProducts} />
                        </div>

                    </div>
                </div>
            </DashboardLayout>
            {/* ----------------all product drawer with search-------------------- */}
            <ProductDrawer
                isOpen={show}
                toggleDrawer={toggleDrawer}
                dir={"right"}
                setGetProductId={setProducts}
                getProductId={products}
            />
        </>
    );
};

export default updatePage;