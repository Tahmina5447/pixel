import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { convertTimestamp2 } from '../../../lib/convertTimestampDateAndTime';

const MagazineCard = ({ data }) => {
    return (
        <div className='w-full p-3 bg-white'>
            <Link href={`/magazine/${data?._id}`}>
                <Image
                    src={data?.image}
                    width={700}
                    height={300}
                    className='w-full h-[180px] sm:h-[280px] mb-1'
                />
            </Link>
            <span className='text-light-text text-sm text-black/40'>{convertTimestamp2(data?.createdAt)}</span>
            <Link href={`/magazine/${data?._id}`}>
                <p className=' text-lg md:text-xl my-3 avenir '>{data?.title}</p>
            </Link>
            <p className=' text-xs text-black/70 my-3 avenir2 '>{data?.shortDes?.slice(0,70)}...</p>
            <Link href={`/magazine/${data?._id}`}>
                <p className='text-xs  text-blue-400 avenir'>CONTINUE READING</p>
            </Link>
        </div>
    );
};

export default MagazineCard;