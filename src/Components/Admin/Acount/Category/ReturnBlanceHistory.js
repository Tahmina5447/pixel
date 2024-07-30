import React from 'react';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const ReturnBlanceHistory = ({ history, index }) => {
    const { date, time } = convertTimestamp(history.createdAt);
    return (
        <div>
            <div key={index} className='flex justify-between gap-5 px-1 sm:px-3 py-2 border-b bg-gray-100 mb-1'>
            
                    <div className='flex items-center gap-2'>
                        <div className='p-1 bg-yellow-400 rounded-md'><Icon className='text-yellow-950 text-[10px]' icon="icon-park:return" /></div>
                        <div>
                            <p className='text-sm font-bold'>Return Amount:<span className='text-gray-500'> ৳{history?.returnAmount}</span> </p>
                            {
                               history?.note && <h2 className=' text-[11px] text-gray-500'>Note : {history?.note}</h2>
                            }
                        </div>
                    </div>
                <div>
                    <p className='text-[10px] font-semibold '><span className='text-gray-500'> {date}</span></p>
                    <p className='text-[10px] font-semibold mt-1'><span className='text-gray-500'> {time}</span></p>
                </div>

            </div>

        </div>
    );
};

export default ReturnBlanceHistory;