import { useRouter } from 'next/router';
import React from 'react'
import DashboardLayout from '../../../../../src/Components/DashboardLayout'
import { useState } from 'react';
import { server_url_v2 } from '../../../../../lib/config';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { geBalanceHistory } from '../../../../../lib/helper';
import { Icon } from '@iconify/react';
import HistoryCard from '../../../../../src/Components/Admin/Acount/Balance/HistoryCard';
import LoadingComponets from '../../../../../src/Shared/LoadingComponets';
import AdminDashboardBreadcrumb from '../../../../../src/Shared/AdminDashboardBreadcrumb';
import { useFetchVersionTwo } from '../../../../../src/hooks/usePublicFetchVersionTwo';
import CreateContext from '../../../../../src/Components/CreateContex';
import { useContext } from 'react';
import FileteredHistory from '../../../../../src/Components/Admin/Acount/Balance/FileteredHistory';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertTimestamp2 } from '../../../../../lib/convertTimestampDateAndTime';

const History = () => {
    const router = useRouter();
    const { id } = router.query;
    const [queryFilter, setQueryFilter] = useState("");
    const [search, setSearch] = useState(null)
    const [visible, setVisible] = useState(10);
    const [activeType, setACtiveType] = useState("")
    const { historyName, setHistoryName } = useContext(CreateContext)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;


    let url = `${server_url_v2}/accounts/account-history?sort=-createdAt&category=${id}`
    const url2 = `${server_url_v2}/return-expense-money`
    useEffect(() => {
        if (search) {
            url = `${server_url_v2}/accounts/account-history?sort=-createdAt&category=${id}&search=${search}`
        }
    }, [search])
    const { data, isLoading, refetch } = useQuery(
        ["Balance-History", search, id, queryFilter],
        () => {
            return geBalanceHistory(url, queryFilter);
        }
    );

    const { data: categories } = useFetchVersionTwo([id], `expense-category/${id}`)

    const formattedStartDate = convertTimestamp2(startDate);
    const formattedEndDate = convertTimestamp2(endDate);
    useEffect(() => {
        if (startDate === null) {
            setQueryFilter('');
        } else if (formattedStartDate && formattedEndDate) {
            setQueryFilter(`&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
            refetch(["Balance-History", formattedStartDate, formattedEndDate]);
        }
    }, [startDate, endDate, refetch]);

    const { data:returnData, refetch:returnRefetch } = useQuery(
        ["Balance-History-return",],
        () => {
          return geBalanceHistory(url2);
        }
      );

    // const handleOrderDateFilter = () => {
    //     if (!startDate || !endDate) {
    //         return alert("please select date");
    //     }

    //     if (new Date(startDate) > new Date(endDate)) {
    //         return alert("invalid date input");
    //     }
    //     setQueryFilter(`&startDate=${startDate}&endDate=${endDate}`);
    //     refetch(["Balance-History", startDate, endDate]);
    // };
    const accounts = data?.data?.Accounts

    const clearData = () => {
        setQueryFilter("")
        setEndDate(0)
        setStartDate(0)
        setSearch("")
    }

    const handleSelectedType = (event) => {
        setACtiveType(event.target.value);
    };
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 10);
    };
    const categoryTitle = categories?.data?.title


    return (
        <DashboardLayout>
            <section className="mt-8 mb-16">
                <AdminDashboardBreadcrumb
                    title={`History :`}
                    title2={categoryTitle}
                    subtitle={
                        ""
                    }
                />
                <div className=' w-full '>

                    <div className='mt-5 border p-3 md:p-6 rounded-md'>
                        <div className='flex items-center md:gap-5 gap-2 md:flex-row  flex-col justify-between'>
                            <div className=" w-full">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="input"
                                    placeholder="Search name..."
                                    className="input input-bordered w-full "
                                />
                            </div>
                            <div className=" bg-white border px-[5px] py-[11px] rounded-lg md:w-[350px] w-full ">
                                <select
                                    onChange={handleSelectedType}
                                    value={activeType}
                                    className=" outline-none  w-full"
                                    placeholder="Choose Your Account Name"
                                >
                                    <option value={""}>
                                        All History
                                    </option>
                                    <option value={"expense"}>Expenses</option>
                                    <option value={"income"}>Income</option>
                                </select>

                            </div>
                            <div className="flex justify-center items-center mt-2 sm:mt-0">
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => {
                                        setDateRange(update);
                                    }}
                                    isClearable={true}
                                    placeholderText="Filter By Date"
                                    className="w-[240px] border border-gray-500 rounded-md pl-2 pr-8 py-2 "
                                />
                            </div>
                            {/* <div className="w-full grid grid-cols-1 md:flex items-center justify-center gap-2  ">
                                <div className=" w-full">
                                    <input
                                        type={"date"}
                                        placeholder="mm/dd/yyy"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        
                                        className="input input-bordered w-full "
                                    />
                                </div>
                                <div className=" w-full">
                                    <input
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        type={"date"}
                                        placeholder="mm/dd/yyy"
                                        
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
                            </div> */}
                            {
                                search ? <div>
                                    <button onClick={() => clearData()} className='py-[11px] px-5 bg-red-500 text-white font-bold rounded-lg'>Clear</button>
                                </div> : null
                            }
                        </div>
                        {
                            activeType === "expense" && <FileteredHistory categoryTitle={categoryTitle} isLoading={isLoading} refetch={refetch} accounts={accounts.filter((account) => account.type === activeType)} returnRefetch={returnRefetch} returnAllData={returnData?.data?.result} />
                        }
                        {
                            activeType === "income" && <FileteredHistory categoryTitle={categoryTitle} isLoading={isLoading} refetch={refetch} accounts={accounts.filter((account) => account.type === activeType)} returnRefetch={returnRefetch} returnAllData={returnData?.data?.result}  />
                        }
                        {
                            activeType == "" && <FileteredHistory categoryTitle={categoryTitle} isLoading={isLoading} refetch={refetch} accounts={accounts} returnRefetch={returnRefetch} returnAllData={returnData?.data?.result}  />
                        }
                        {/* <div className=' mt-3'>
                            {!isLoading ? (
                                <div className="grid grid-cols-1 py-2 sm:grid-cols-1 md:grid-cols-1 flex-wrap">
                                    <>
                                        {
                                            data?.data?.Accounts.length ? (
                                                data?.data?.Accounts?.slice(0, visible).map((account, index) => (
                                                    <HistoryCard account={account} key={index} categoryTitle={categoryTitle} refetch={refetch} />
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
                                data?.data?.Accounts.length > visible && <div className=' flex items-center justify-center mt-4'>
                                    <button onClick={showMoreItems} className='py-2 px-3 bg-primary text-white rounded-md font-bold hover:btn-info'>See More</button>
                                </div>
                            }
                        </div> */}
                    </div>
                </div>
            </section>
        </DashboardLayout>
    )
}

export default History;