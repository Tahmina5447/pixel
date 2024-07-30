import React from 'react';

const CustomFeaturedCategoriesSkeleton = () => {
    const cards =[1,2,3,4,5,6]
    return (
       
        <div className='hidden lg:flex gap-4'>
            {
                cards.map((card,index)=><div className='w-full h-20 skeleton'>

                </div>)
            }
        </div>
    );
};

export default CustomFeaturedCategoriesSkeleton;