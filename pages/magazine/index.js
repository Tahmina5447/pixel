import React, { useState } from 'react';
import MagazineCard from '../../src/Components/MagazineSection/MagazineCard';
import { useQuery } from 'react-query';
import LoadingComponets from '../../src/Shared/LoadingComponets';
import { server_url_v3 } from '../../lib/config';

const index = () => {
    const [sliceItem, setSliceItem] = useState(6)
    const { data, isLoading } = useQuery({
        queryKey: ["magazineData"],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom?modelName=Blog`
            ).then((res) => res.json()),
    });
    const magazineData = data?.data?.result;
    // console.log(magazineData)

    return (
        <div className='py-3'>
            <div className='px-5 md:px-10'>
                {
                    isLoading ? <><LoadingComponets /></> : <>
                        {
                            magazineData?.length > 0 ? <>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                                    {
                                        magazineData?.slice(0, sliceItem)?.map((magazine, index) => <MagazineCard key={index} data={magazine} />)
                                    }
                                </div>

                            </> : <>
                                <div className='h-[80vh] flex items-center justify-center'>
                                    <p className='text-lg font-bold text-gray-600'>Coming Soon</p>
                                </div>
                            </>
                        }
                    </>


                }
                {
                    (magazineData?.length > sliceItem && magazineData?.length !== sliceItem) && <div className="text-center pt-5">
                        <button
                            onClick={() => setSliceItem(prev => prev + 5)}
                            className="inline-block py-1 text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
                        >
                            VIEW MORE
                        </button>
                    </div>
                }
            </div>

        </div>
    );
};

export default index;