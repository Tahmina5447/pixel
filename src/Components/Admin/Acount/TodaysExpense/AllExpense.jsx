import React from 'react';
import { useState } from 'react';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import { useQuery } from 'react-query';
import { base_url_v2, getRowData } from '../../../../../lib/helper';
import LoadingComponets from '../../../../Shared/LoadingComponets';
import CustomPagination from '../../../../Shared/CustomPagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AllExpenseTableData from './AllExpenseTableData';

const AllExpense = ({type}) => {
    // const [todaysExpense, setTodaysExpense] = useState([])
    const [queryFilter, setQueryFilter] = useState("");
    // const { date, time } = convertTimestamp(new Date());
    // const [filterDate, setFilterDate] = useState(null)
    const [currentItems, setCurrentItems] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null)

    const url = `${base_url_v2}/expense-calculate-sub-item${type==="unpaid" ? "?isPaid=unpaid" : ""}`
    // const { data, isLoading, refetch } = useFetchVersionTwo(["expense-calculate-sub-item"], `expense-calculate-sub-item?payableDate=${date}${queryFilter}`)
    const { data, isLoading, refetch } = useQuery(
        ["row-data-all", queryFilter],
        () => {
            return getRowData(url, queryFilter);
        }
    );
    const todaysExpense = data?.data

    const handleSearchFilter = (e) => {
        const value = e.target.value;
        setQueryFilter(`?search=${value}`);
        refetch();
    };

    // type==="unpaid" ? data?.data?.result.filter(item=>item.isPaid === "unpaid") :

    const handleStatusFilter = (e) => {
        const value = e.target.value;
        if (!value) {
            setQueryFilter(``);
            return refetch();
        }
        setQueryFilter(`?isPaid=${value}`);
        refetch();
    };
    const { date, time } = convertTimestamp(selectedDate);



    const handleDateFilter = (value) => {
        setSelectedDate(value)
        const { date, time } = convertTimestamp(value);
        if (!value) {
            setQueryFilter(``);
            return refetch();
        }
        setQueryFilter(`?payableDate=${date}`);
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
                            className="w-full rounded-md input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                            placeholder="Search by Title"
                        />
                    </div>
                    
                    {
                        type !== "unpaid" && <div className="w-full">
                        <select
                            onChange={handleStatusFilter}
                            className="select w-full select-bordered "
                        >
                            <option value={""}>All</option>
                            <option value={"paid"}>Paid</option>
                            <option value={"unpaid"}>Unpaid</option>
                        </select>
                    </div> 
                    }

                    <div className='w-full'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => handleDateFilter(date)}
                            isClearable
                            placeholderText="Filter By Date"
                            className="w-full border border-gray-300 rounded-md pl-2 pr-8 py-2.5 "
                        />
                    </div>
                </div>

                <div className="container mx-auto mt-5">
                    <div className="overflow-x-auto rounded-md  bg-white shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="divide-gray-200 ">
                                <tr className="text-left uppercase font-extrabold">
                                    <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{"Paying Date"}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isLoading ? <div className=' flex items-center justify-center w-full'><LoadingComponets /> </div> :
                                    currentItems?.length >0 ?  currentItems?.map((item, index) => <AllExpenseTableData key={index} refetch={refetch} item={item} />): <p className='px-3 py-2'>Data is empty</p>
                                }
                            </tbody>
                        </table>
                    </div>
                    <CustomPagination
                        arrayData={data?.data?.result}
                        setCurrentItems={setCurrentItems}
                        itemsPerPage={15}
                    />
                </div>
            </div >
        </>
    );
};

export default AllExpense;