import React from 'react';
import TodaysExpenseTableData from './TodaysExpenseTableData';
import { useFetchVersionTwo } from '../../../../hooks/usePublicFetchVersionTwo';
import { useEffect } from 'react';
import { useState } from 'react';
import { server_url_v2 } from '../../../../../lib/config';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import { base_url_v2, getRowData } from '../../../../../lib/helper';
import LoadingComponets from '../../../../Shared/LoadingComponets';

const ExpenseToDay = () => {
    // const [todaysExpense, setTodaysExpense] = useState([])
    const [queryFilter, setQueryFilter] = useState("");
    const { date, time } = convertTimestamp(new Date());
    const url = `${base_url_v2}/expense-calculate-sub-item?payableDate=${date}`
    // const { data, isLoading, refetch } = useFetchVersionTwo(["expense-calculate-sub-item"], `expense-calculate-sub-item?payableDate=${date}${queryFilter}`)
    const { data, isLoading, refetch } = useQuery(
        ["row-data", queryFilter],
        () => {
            return getRowData(url, queryFilter);
        }
    );
    const todaysExpense = data?.data

  

    const handleSearchFilter = (e) => {
        const value = e.target.value;
        setQueryFilter(`&search=${value}`);
        refetch();
    };

    const handleStatusFilter = (e) => {
        const value = e.target.value;
        if (!value) {
            setQueryFilter(``);
            return refetch();
        }
        setQueryFilter(`&isPaid=${value}`);
        refetch();
    };

    return (
        <>
            <div
                className={`  mt-5`}
            >

                <div className="p-5 rounded bg-white shadow flex justify-between items-center gap-4 flex-wrap md:flex-nowrap">
                    <div className=" w-full">
                        <input
                            type="text"
                            onChange={handleSearchFilter}
                            className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                            placeholder="Search by Title"
                        />
                    </div>
                    <div className="w-full">
                        <select
                            onChange={handleStatusFilter}
                            className="select w-full select-bordered "
                        >
                            <option value={""}>all</option>
                            <option value={"paid"}>Paid</option>
                            <option value={"unpaid"}>Un Paid</option>
                        </select>
                    </div>

                    {/* <div className="w-full grid grid-cols-1 md:flex gap-2 justify-start md:justify-center items-center p-2 flex-wrap ">
                        <div className="">
                            <input
                                onChange={(e) => setStartDate(e.target.value)}
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full "
                            />
                        </div>{" "}
                        <span className="hidden md:block"> to</span>
                        <div className="">
                            <input
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
                        {startDate && endDate && (
                            <ExportOrder startDate={startDate} endDate={endDate} />
                        )}
                    </div> */}
                </div>

                <div className="container mx-auto mt-5">
                    <div className="overflow-x-auto rounded-md  bg-white shadow-md">
                        <table className="min-w-full text-xs">
                            <thead className="bg-primary">
                                <tr className="text-left uppercase text-white font-extrabold">
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Pay Expense</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            {
                                isLoading ? <tbody><LoadingComponets /> </tbody> :
                                    <>
                                        {

                                            todaysExpense?.result.length === 0 ? <><div className=' text-[20px] font-bold py-3 text-center w-full'>
                                                Not Found Expense Today
                                            </div></> :
                                                <tbody>
                                                    {
                                                        todaysExpense?.result?.map((item, index) => <TodaysExpenseTableData key={index} refetch={refetch} item={item} />)
                                                    }
                                                </tbody>
                                        }
                                    </>
                            }

                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default ExpenseToDay;