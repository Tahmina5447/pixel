import { useRouter } from 'next/router';
import React from 'react';
import { convertTimestamp2 } from '../../lib/convertTimestampDateAndTime';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { server_url_v3 } from '../../lib/config';
import LoadingComponets from '../../src/Shared/LoadingComponets';
import Head from 'next/head';
import CustomMetaSetting from '../../src/Shared/CustomMetaSetting';

const MagazineDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading } = useQuery({
        queryKey: ["data"],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom/${id}?modelName=Blog`
            ).then((res) => res.json()),
    });
    const magazine = data?.data

   

    return (
        <>
            <Head>
                <CustomMetaSetting
                    productTitle={magazine?.title}
                    productUrl={''}
                    description={magazine?.title}
                    imageUrl={magazine?.image}
                />
            </Head>
            {isLoading ? <><LoadingComponets /></> : <>
                <div>
                    <div className=''>
                        <Image
                            src={magazine?.image}
                            width={1000}
                            height={700}
                            className='w-full h-[250px] object-cover md:[450px]'
                        />
                    </div>
                    <div className='px-5 md:px-10'>
                        <div className='mt-5 md:mt-10'>
                            <h1 className='text-lg md:text-xl font-bold lg:w-2/3 mx-auto mb-2 avenir'>{magazine?.title}</h1>
                            <div className='w-full lg:w-2/3 mx-auto '>
                                {magazine?.description && (
                                    <div className=" text-[14px] text-gray-700 mb-5 md:10 avenir2" dangerouslySetInnerHTML={{ __html: magazine?.description }}></div>
                                )}
                                <span className='text-light-text text-sm'>{convertTimestamp2(magazine?.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    );
};

export default MagazineDetails; 