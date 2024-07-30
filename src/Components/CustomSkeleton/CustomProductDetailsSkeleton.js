import React from 'react';

const CustomProductDetailsSkeleton = () => {
    return (
        <div className='w-10/12 mx-auto mt-4 h-[320px] md:flex gap-5 border p-5'>
            <div className='w-11/12 mx-auto md:w-1/2 h-[170px] md:h-full skeleton'> </div>
            <div className='w-11/12 mx-auto md:w-1/2 flex flex-col justify-between mt-4 md:mt-0'>
                <div className='flex flex-col gap-4'>
                    <div className='w-10/12  h-[15px] skeleton'></div>
                    <div className='w-10/12 h-[15px] skeleton'></div>
                    <div className='w-4/12  h-[15px] skeleton'></div>
                    <div className='hidden md:flex items-center gap-5'>
                        <div className='w-1/12  h-[15px] skeleton'></div>
                        <div className='w-1/12  h-[15px] skeleton'></div>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='w-4/12 h-[20px] skeleton'></div>
                    <div className='w-4/12 h-[20px] skeleton'></div>
                </div>
            </div>
        </div>
    );
};

export default CustomProductDetailsSkeleton;