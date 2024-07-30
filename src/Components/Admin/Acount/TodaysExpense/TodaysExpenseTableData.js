import { Icon } from '@iconify/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { server_url_v2 } from '../../../../../lib/config';
import { CustomPostMethodHook, deleteMethod } from '../../../../../lib/usePostHooks';
import CustomModal from '../../../../Shared/CustomModal';
import AddExpense from '../Category/AddExpense';
import ChangeExpenseDate from './ChangeExpenseDate';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import UpdateExpense from '../Category/UpdateExpense';

const TodaysExpenseTableData = ({ refetch, item, day,overRefetch,accountRefetch }) => {
    const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false)
    const [editExpenseModalOpen, setEditExpenseModalOpen] = useState(false)
    const { date, time } = convertTimestamp(new Date(item?.payableDate));

    const handleDelete = (id) => {
        const url = `${server_url_v2}/expense-calculate-sub-item/${id}`
        deleteMethod(url, refetch)
    }
    return (

        <tr className="border-b border-opacity-20 border-gray-500 ">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                {item?.title}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                ৳{item?.amount}
            </td>
            <td className="p-3 text-left text-sm">
                {day === "today" && <button onClick={() => setAddExpenseModalOpen(true)} disabled={item?.isPaid === "paid"} className={`${item?.isPaid === "paid" ? 'cursor-not-allowed bg-gray-200 text-gray-300' : 'bg-primary text-white'}  px-2 font-bold rounded-md flex items-center gap-1`}>Pay<Icon icon="zondicons:add-solid" /></button>}
                {day === "all" && date}
            </td>
            <td className="p-3 text-left text-sm ">
                <span className='flex items-center gap-2'>
                    <Tooltip anchorSelect="#change_date">
                        Change Paying Date
                    </Tooltip>
                    <span id='change_date' onClick={() => setEditExpenseModalOpen(true)} className='cursor-pointer'> <Icon className='text-yellow-600 text-lg' icon="bx:edit" /></span>
                    <Tooltip anchorSelect="#delete_table_expense">
                        Delete
                    </Tooltip>
                    <span id='delete_table_expense' className='cursor-pointer '><Icon onClick={() => handleDelete(item._id)} className='text-red-600 text-lg' icon="material-symbols:delete-outline" /></span>
                </span>
            </td>
            <CustomModal
                modalIsOpen={addExpenseModalOpen}
                setIsOpen={setAddExpenseModalOpen}
            >
                <UpdateExpense
                    setAddExpenseModalOpen={setAddExpenseModalOpen}
                    amount={item?.amount}
                    title={item?.title}
                    id={item?._id}
                    refetchToDayDue={refetch}
                    overRefetch={overRefetch} accountRefetch={accountRefetch}
                />
            </CustomModal>
            <CustomModal
                modalIsOpen={editExpenseModalOpen}
                setIsOpen={setEditExpenseModalOpen}
            >
                <ChangeExpenseDate
                    setEditExpenseModalOpen={setEditExpenseModalOpen}
                    id={item?._id}
                    refetch={refetch}
                />
            </CustomModal>
        </tr>
    );
};

export default TodaysExpenseTableData;