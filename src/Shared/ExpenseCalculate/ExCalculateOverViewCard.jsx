import { Icon } from '@iconify/react';
import React from 'react';

const ExCalculateOverViewCard = ({ amount, title }) => {
    return (

        <div className='rounded-md  bg-gradient-to-r from-primary-focus to-primary w-full  shadow-md    flex justify-between relative'>
            {/* <div id='div1' className='absolute  top-[-90px] right-[47px] rounded-full bg-[#3f907573] h-32 w-32 z-0'></div>
                        <div id='div2' className='absolute  bottom-[-27px] left-[-31px] rounded-full bg-[#3f907573] h-20 w-20 z-0'></div> */}
            {/* -------------update and history-------------- */}
            <div className=' m-3 flex flex-col justify-between  text-white w-2/3'>
                <h1 className='text-md font-semibold uppercase'>{title}</h1>
                <p className='text-white font-bold text-xl'> ৳{amount} </p>
            </div>
            <div className=' w-1/3'>

                <div className='flex justify-center mb-2 h-full '>
                    <Icon className='text-4xl self-center text-white' icon="simple-icons:virustotal" />
                </div>
            </div>
        </div>
    );
};

export default ExCalculateOverViewCard;