import React from 'react';

const CustomTooltip = ({
    show,
    title,
    position
}) => {
   

    return (
        <div className={`tooltip ${show ? 'block absolute right-7 top-4 z-40' : 'hidden'} ${position} `}>
            <div className='bg-black text-white text-center w-full py-1 px-3 rounded'>
                <span className='text-sm font-medium w-full'>{title}</span>
            </div>
        </div>
    );
};

export default CustomTooltip;