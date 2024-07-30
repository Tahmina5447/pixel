import React from 'react';
import { useMyShopData } from '../../../hooks/useMyShopData';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Link from 'next/link';
const Header = ({ data, loading }) => {
    const { isLoading, data: shopData, error } = useMyShopData();
    const youtube = data?.YouTube;
    function extractVideoID(url) {
        const regex = /(?:\?v=|&v=|youtu\.be\/|shorts\/)([^&\n]+)/;
        const match = url.match(regex);
        if (match) {
            return match[1];
        }
        return null;
      }
    return (
        <div className='bg-primary py-8'>
            <div className='mid-container'>
                <div className='flex justify-center mb-8'>
                    <div className='border-4 bg-white  px-4 rounded-2xl z-20 '>
                        <Image
                            src={shopData?.data.logo}
                            alt="logo"
                            height={80}
                            width={200}
                            className="w-[200px] object-cover py-2 "
                        />
                    </div>
                </div>
                <div className='border px-10 py-4 md:px-20 md:py-9 rounded-lg'>
                    <h1 className='text-white font-bold text-[20px] md:text-[35px] text-center'>
                        {data?.title1}
                    </h1>
                </div>
                <div className='py-3 md:py-8'>
                    <h1 className='text-[18px] md:text-[32px] font-[400] text-center text-white'>
                        {data?.title2}
                    </h1>
                </div>
                <div className='flex items-center justify-center'>
                    <Link
                        href={'#palace-order'}
                        className=' text-white bg-orange-500 rounded-lg px-4 py-2 border-2 border-orange-200 font-bold text-[18px] md:text-[32px] flex items-center  gap-2'>
                        <span>অর্ডার করতে ক্লিক করুন</span><span className='hidden md:block'><Icon icon="el:hand-right" /></span>
                    </Link>
                </div>
                <div className='bg-black rounded-xl p-1 md:p-2  md:mx-10 my-8 md:my-14'>
                    <div className='h-[200px] md:h-[300px] lg:h-[450px] w-full'>
                        {youtube ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${extractVideoID(youtube)}`}
                                title="YouTube video player"
                                // frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className=''
                            ></iframe>
                        ) : (
                            <h2>Video Not Found</h2>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;