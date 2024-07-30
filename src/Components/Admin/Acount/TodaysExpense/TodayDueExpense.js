import React, { useEffect } from 'react';
import TodaysExpenseTableData from './TodaysExpenseTableData';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import { useState } from 'react';
import { v2QueryFetch } from '../../../../../lib/helper';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const TodayDueExpense = ({ day,overRefetch,accountRefetch }) => {
    // const [todaysExpense, setTodaysExpense] = useState([])
    const { date, time } = convertTimestamp(new Date());
    const [queryFilter, setQueryFilter] = useState("/expense-calculate-sub-item?sort=payableDate");
    const todayDate = new Date().toISOString(); // This will get the current date in ISO format
    const [filterdata,setFilterdata] = useState([])


    // const { data, isLoading, refetch } = useFetchVersionTwo(["", day], `${day === "today" ? `expense-calculate-sub-item?payableDate=${date}` : "expense-calculate-sub-item?sort=-payableDate"}`)
    // const [todaysExpense, setCurrentData] = useState([])
    const {
        data,
        isLoading,
        refetch,
    } = useQuery(["expense-calculate-due", queryFilter], () => {
        return v2QueryFetch(queryFilter);
    });

    // useEffect(() => {
    //     if (day === "today") {
    //         setQueryFilter(`/expense-calculate-sub-item?payableDate=${date}`)
    //         refetch([`expense-calculate-sub-item?payableDate=${date}`])
    //     }
    // }, [day])


    const todaysExpense = data?.data?.result



    // Sort the array by the difference between today's date and the "payableDate"
    todaysExpense?.sort((a, b) => {
        const dateA = new Date(a.payableDate);
        const dateB = new Date(b.payableDate);

        const diffA = Math.abs(dateA - new Date(todayDate));
        const diffB = Math.abs(dateB - new Date(todayDate));

        return diffA - diffB;
    });

        useEffect(() => {
        if (day === "today") {
            const today = todaysExpense?.filter(item=>item?.payableDate===date && item.isPaid === "unpaid")
            setFilterdata(today)
        }else{
            const all = todaysExpense?.filter(item=>item.isPaid === "unpaid")
            setFilterdata(all) 
        }
    }, [day,todaysExpense])


    return (
        <div className='mt-8 md:mt-16'>
            <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-600 uppercase mb-1'> {day === "today" ? "Today" : "nearable"} Due Expenses</h2>
            {day === "today" ? "" : <Link href={"/admin/account/balance/all-due-expense"} className='flex items-center gap-1 bg-primary hover:bg-green-700 text-white px-2 rounded-full'>See all <Icon icon="bi:arrow-right" /></Link>}
            </div>
            <div class="flex flex-col bg-white ">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{day === "today" ? "Payment" : "Paying Date"}</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 ">
                                    {
                                        filterdata?.length > 0 ? <>
                                            {
                                                filterdata?.slice(0,day === "today" ? 100 : 6).map((item, index) => { 
                                                    return <TodaysExpenseTableData key={index} day={day} refetch={refetch} overRefetch={overRefetch} accountRefetch={accountRefetch} item={item} /> 
                                                })}
                                        </> : <>

                                            <tr><div class="px-6 py-3 whitespace-nowrap text-sm text-gray-800 ">No due expenses yet today</div></tr>

                                        </>
                                    }

                                </tbody>

                            </table>
                            {/*  {
                                day === "all" && <CustomPagination arrayData={todaysExpense?.result?.filter(item => item.isPaid === "unpaid")}
                                    setCurrentItems={setCurrentData}
                                    itemsPerPage={5} />
                            } */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TodayDueExpense;