import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper";

import Link from 'next/link';
import { LandingPageGallaryImages } from '../../../../lib/LandingPageGallaryImages';
import { useEffect } from 'react';
import Image from 'next/image';

const GalarySection = ({ data, loading }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allImageUrls, setallImageUrls] = useState([])



    // const gallery = data?.galleryImages;

    useEffect(() => {
        if (data?.title1) {
            const galaryImages = LandingPageGallaryImages(data)

            setallImageUrls(galaryImages)
        }


    }, [data])
    /* 
        if (gallery) {
            allImageUrls.push(...gallery);
        }
    
        const products = data?.products;
    
        console.log(products)
    
        products?.forEach((product) => {
            if (product?.imageUrls && Array.isArray(product?.imageUrls)) {
                allImageUrls.push(...product?.imageUrls);
            }
        }); */

    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };

    return (
        <div className='py-10 md:py-20'>
            <div className='bg-primary rounded-lg px-10 py-7'>
                <h1 className='text-[16px] md:text-[28px] font-[400] text-center text-white'>
                    {data?.shortDes}
                </h1>
            </div>
            <div className='border-2 md:border-[5px] border-primary rounded-lg px-4 py-3 md:px-8 md:py-6 my-8'>
                <div className='bg-primary px-4 py-2 rounded-lg '>
                    <h1 className='text-[18px] md:text-[28px] font-bold text-center text-white'>
                        {data?.galleryTitle}
                    </h1>
                </div>

                <div className='my-7'>
                    <Swiper
                        spaceBetween={20}
                        modules={[Autoplay]}
                        className={''}
                        autoplay={true}
                        breakpoints={{
                            '@.50': {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            '@1.00': {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            '@1.50': {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            '@1.75': {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            '@2.25': {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            }
                        }}
                    >

                        {allImageUrls?.map((image, index) => (
                            <SwiperSlide className='cursor-pointer' key={index} onClick={() => openModal(image)}>
                                <Image
                                    width={500}
                                    height={250}
                                    alt="banner"
                                    className="object-cover h-[250px]"
                                    src={image}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>


                <div className='flex items-center justify-center'>
                    <Link href={'#palace-order'} className='text-white bg-orange-500 rounded-lg px-4 py-2 border-2 border-orange-200 font-bold text-[15px] md:text-[25px] flex  gap-2'>
                        <span>অর্ডার করতে ক্লিক করুন</span>
                    </Link>
                </div>
            </div>
            {modalOpen && selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black z-[666666] duration-300 flex items-center justify-center">
                    <div className="relative max-w-screen-xl w-full h-full flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt="Modal Image"
                            width={200}
                            height={200}
                            className='object-contain '


                        />
                        <button
                            className="absolute top-4 right-4 text-white text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GalarySection;