import React from 'react';
import TodaysExpenseTableData from './TodaysExpenseTableData';
import { useFetchVersionTwo } from '../../../../hooks/usePublicFetchVersionTwo';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';

const AllDueExpense = () => {
    // const [todaysExpense, setTodaysExpense] = useState([])
    const { date, time } = convertTimestamp(new Date());
    const { data, isLoading, refetch } = useFetchVersionTwo(["expense-calculate-sub-item"], `expense-calculate-sub-item`)
    const todaysExpense = data?.data
    return (
        <div className='mt-8 md:mt-16'>

            <h2 className='text-xl font-bold text-slate-600 uppercase'>All Due Expenses</h2>
            <div class="flex flex-col bg-white ">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paying</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 ">
                                    {
                                        todaysExpense?.result?.length > 0 ? <>
                                            {
                                                todaysExpense?.result?.map((item, index) => { return item.isPaid === "unpaid" && <TodaysExpenseTableData refetch={refetch} item={item} /> })}
                                        </> : <>

                                            <div class="px-6 py-3 whitespace-nowrap text-sm text-gray-800 ">No due expenses  yet</div>

                                        </>
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllDueExpense;