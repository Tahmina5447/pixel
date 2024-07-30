import React from 'react';

const CustomProductSectionSkeleton = () => {
    const cards = [1, 2, 3, 4, 5]
    return (
        <div className='p-5 rounded-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-5'>
            {
                cards.map((card, index) => <div key={index} className=' pt-3 rounded-sm border'>
                    <div className='  h-[180px] w-10/12 mx-auto skeleton'></div>
                    <div className='  h-[80px] w-10/12 mx-auto'>
                        <div className='w-8/12 h-[15px] my-3 skeleton'></div>
                        <div className='w-6/12 h-[15px] my-3 skeleton'></div>
                        <div className='w-10/12 h-[15px] my-3 skeleton'></div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default CustomProductSectionSkeleton;