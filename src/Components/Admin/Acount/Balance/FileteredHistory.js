import React, { useState } from 'react';
import LoadingComponets from '../../../../Shared/LoadingComponets';
import HistoryCard from './HistoryCard';

const FileteredHistory = ({accounts,isLoading,refetch,categoryTitle,returnAllData,returnRefetch}) => {
    
    const [visible, setVisible] = useState(10);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 10);
    };
    return (
        <div className=' mt-3'>
            {!isLoading ? (
                <div className="grid grid-cols-1 py-2 sm:grid-cols-1 md:grid-cols-1 flex-wrap">
                    <>
                        {
                            accounts?.length ? (
                                accounts?.slice(0, visible).map((account, index) => (
                                    <HistoryCard account={account} key={index}  refetch={refetch} categoryTitle={categoryTitle} returnAllData={returnAllData} returnRefetch={returnRefetch}/>
                                ))
                            ) : (
                                <div className=' drop-shadow-sm py-4 bg-gray-100 rounded-lg px-5'>
                                    <h2 className=' text-[18px] font-extrabold'>History Not Found! </h2>
                                </div>
                            )

                        }
                    </>
                </div>
            ) : (
                <LoadingComponets />
            )}
            {
                accounts?.length > visible && <div className=' flex items-center justify-center mt-4'>
                    <button onClick={showMoreItems} className='py-2 px-3 bg-primary text-white rounded-md font-bold hover:btn-info'>See More</button>
                </div>
            }
        </div>
    );
};

export default FileteredHistory;