import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { geBalanceHistory } from '../../../../../lib/helper';
import { useState } from 'react';
import LoadingComponets from '../../../../Shared/LoadingComponets';
import HistoryCard from './HistoryCard';
import { MdOutlineUnfoldMore } from "react-icons/md";
import { server_url_v2 } from '../../../../../lib/config';




const BalanceHistory = ({ id, accountName }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [queryFilter, setQueryFilter] = useState("");
    const [search, setSearch] = useState(null)
    const [visible, setVisible] = useState(10);
    let url = `${server_url_v2}/accounts/account-history?sort=-createdAt&historyParentAccount=${id}`
    let ur2 = `${server_url_v2}/accounts/account-history?sort=-createdAt`
    useEffect(() => {
        if (search) {
            url = `${server_url_v2}/accounts/account-history?sort=-createdAt&historyParentAccount=${id}&search=${search}`
            ur2 = `${server_url_v2}/accounts/account-history?sort=-createdAt&search=${search}`
        }
    }, [search])
    const { data, isLoading, refetch } = useQuery(
        ["Balance-History", search, id, queryFilter],
        () => {
            return geBalanceHistory(id ? url : ur2, queryFilter);
        }
    );





    const handleOrderDateFilter = () => {
        if (!startDate || !endDate) {
            return alert("please select date");
        }

        if (new Date(startDate) > new Date(endDate)) {
            return alert("invalid date input");
        }
        setQueryFilter(`&startDate=${startDate}&endDate=${endDate}`);
        refetch(["Balance-History", startDate, endDate]);
    };


    const clearData = () => {
        setQueryFilter("")
        setEndDate(0)
        setStartDate(0)
        setSearch("")
    }


    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 10);
    };

    return (
        <div className='md:w-[800px] w-full '>
            <h2 className=' text-[25px] font-bold'>Balance History: <span className=' text-primary'>{accountName}</span></h2>
            <div className='mt-5 border p-3 md:p-6 rounded-md'>
                <div className='flex items-center md:gap-10 gap-2 md:flex-row  flex-col justify-between'>
                    <div className="md:w-[80%] w-full">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="input"
                            placeholder="Search name..."
                            className="input input-bordered w-full "
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 md:flex items-center justify-center gap-2  ">
                        <div className=" w-full">
                            <input
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full "
                            />
                        </div>
                        <div className=" w-full">
                            <input
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <span
                            onClick={handleOrderDateFilter}
                            className="btn btn-primary  md:btn-square btn-md text-white hover:btn-info"
                        >
                            <Icon
                                icon="fa:search"
                                className=" text-white text-lg text-[24px] "
                            />
                            <span className="md:hidden block">Search</span>
                        </span>
                    </div>
                    {
                        search || startDate || endDate ? <div>
                            <button onClick={() => clearData()} className='py-[10px] px-3 bg-red-500 hover:bg-red-800 text-white font-bold rounded-lg'><Icon icon="ic:baseline-close" className=' text-[25px]' /></button>
                        </div> : null
                    }
                </div>

                <div className=' mt-3 max-h-[400px]  overflow-x-scroll'>
                    {!isLoading ? (
                        <div className="grid grid-cols-1 py-2 sm:grid-cols-1 md:grid-cols-1 flex-wrap">
                            {
                                data?.data?.Accounts.length ? (
                                    data?.data?.Accounts?.slice(0, visible).map((account, index) => (
                                        <HistoryCard account={account} key={index} />
                                    ))
                                ) : (
                                    <div className=' drop-shadow-sm py-4 bg-gray-100 rounded-lg px-5'>
                                        <h2 className=' text-[18px] font-extrabold'>History Not Found! </h2>
                                    </div>
                                )

                            }
                        </div>
                    ) : (
                        <LoadingComponets />
                    )}
                    {
                        data?.data?.Accounts.length > visible && <div className=' flex items-center justify-center mt-4'>
                            <button
                                onClick={showMoreItems}
                                className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
                            >
                                <MdOutlineUnfoldMore size={22} />
                                See More
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BalanceHistory