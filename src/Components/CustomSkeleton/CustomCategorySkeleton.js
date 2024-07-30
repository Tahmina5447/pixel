import React from 'react';

const CustomCategorySkeleton = () => {
    return (
        <div className='hidden lg:block w-full h-[380px]'>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton '></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
            <div className='w-10/12 mx-auto h-4 mt-4 skeleton'></div>
        </div>
    );
};

export default CustomCategorySkeleton;