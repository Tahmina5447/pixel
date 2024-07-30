import { SortableContext, useSortable } from '@dnd-kit/sortable';
import React from 'react'
import { CSS } from "@dnd-kit/utilities";
import { Icon } from '@iconify/react';
import CalculateItemCard from './CalculateItemCard';
import { useMemo } from 'react';
import { useState } from 'react';
import CustomModal from '../../../../Shared/CustomModal';
import swal from 'sweetalert';
import { deleteMethod } from '../../../../../lib/usePostHooks';
import { base_url_v2 } from '../../../../../lib/helper';
import AddExpenseChild from './AddExpenseChild';

const CalculateCard = ({ expense, List, rowrefetch, setList, refetch }) => {

    const [addExpenseShow, setAddExpenseShow] = useState(false)
    const tasksIds = useMemo(() => {
        return List?.map((task) => task._id);
    }, [List]);




    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: expense._id,
        data: {
            type: "Column",
            expense,
        },
    });


    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    //   get totle amount
    const getTotalAmount = (transactions) => {
        let totalAmount = 0;
        for (const transaction of transactions) {
            totalAmount += transaction.amount;
        }
        return totalAmount;
    };

    const getPaidAmount = (transactions) => {
        const paidTransactions = transactions.filter(transaction => transaction.isPaid === 'paid');
        const totalPaidAmount = paidTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        return totalPaidAmount;
    };

    const getDueAmount = (transactions) => {
        const paidTransactions = transactions.filter(transaction => transaction.isPaid === 'unpaid');
        const totalPaidAmount = paidTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        return totalPaidAmount;
    };



    if (isDragging) {
        return (
            <div className=" bg-[#eeeeee]  shadow-md p-1 w-[340px] h-[600px] max-h-[600px] rounded-md flex flex-col">

            </div>
        )
    }

    const deleteColumn = () => {
        const url = `${base_url_v2}/expense-calculate/${expense._id}`;
        deleteMethod(url, refetch)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className=" bg-[#f1f2f4] shadow-lg border-[8px] border-white relative  w-full h-[600px] max-h-[600px] rounded-md flex flex-col"
        >
            <div {...attributes} {...listeners} className=' bg-[#fff] rounded-t-md px-2 pt-3 flex items-center justify-between gap-2 '>
                <div className=' w-full'>
                    <div className=' flex items-start justify-between'>
                        <div>
                            <h2 className=' text-xl font-semibold capitalize'>{expense?.title}</h2>
                        </div>
                        <div>
                            <button onClick={() => deleteColumn()} className=' group w-[40px] flex items-center justify-center h-[40px] hover:bg-red-500/10 rounded-full'><Icon icon="ic:outline-delete" className=' text-red-400 group-hover:text-red-700 text-[25px]' /></button>
                        </div>
                    </div>
                    <div className=' flex items-center justify-between  gap-4 mt-3'>
                        <div className=' flex gap-2'>
                            <h2 className=' text-[15px] font-bold '>Total Expense :</h2>
                            <h2 className=' text-[16px] font-bold '>{getTotalAmount(List)}</h2>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                                <div className=' bg-primary w-[10px] h-[10px] rounded-full'>

                                </div>
                                <h2 className='text-[14px] font-bold'>Paid</h2>
                            </div>
                            <div className='flex items-center gap-1'>
                                <div className=' bg-red-500 w-[10px] h-[10px] rounded-full'>

                                </div>
                                <h2 className='text-[14px] font-bold'>Due</h2>
                            </div>
                        </div>
                    </div>
                    <div className=' flex items-center justify-between  mb-2'>
                        <div className=' flex gap-2'>
                            <h2 className=' text-[15px] '>Total Paid :</h2>
                            <h2 className=' text-[16px  font-bold'> ৳{getPaidAmount(List)}</h2>
                        </div>
                        <div className=' flex gap-2'>
                            <h2 className=' text-[15px] '>Total Due :</h2>
                            <h2 className=' text-[16px  font-bold'> ৳{getDueAmount(List)}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' absolute bottom-0 left-0 right-0 z-30'>
                <button onClick={() => setAddExpenseShow(true)} className=" btn-primary font-bold w-full text-white py-1 uppercase rounded-b-md flex items-center justify-center gap-2 ">
                    <Icon icon="icon-park-solid:add" className=' text-[24px]' /> Add Expense
                </button>
            </div>

            <div className='flex mt-1 flex-grow flex-col gap-2 p-2 mb-8 overflow-x-hidden overflow-y-auto'>
                <SortableContext items={tasksIds}>
                    {List?.map((item, i) => {
                        return (
                            <CalculateItemCard key={i} item={item} rowrefetch={rowrefetch} />
                        )
                    })}
                </SortableContext>
            </div>
            {/* =========add child Expense======== */}
            <CustomModal modalIsOpen={addExpenseShow} setIsOpen={setAddExpenseShow} >
                <AddExpenseChild setIsOpen={setAddExpenseShow} rowrefetch={rowrefetch} expense={expense} />
            </CustomModal>
        </div>
    )
}

export default CalculateCard