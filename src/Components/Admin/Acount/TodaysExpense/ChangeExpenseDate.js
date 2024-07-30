import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import { ModalUpdateMethodHook } from '../../../../../lib/usePostHooks';
import { server_url_v2 } from '../../../../../lib/config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';

const ChangeExpenseDate = ({ setEditExpenseModalOpen, id, refetch }) => {
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(false)
    const { date, time } = convertTimestamp(selectedDate);


    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm();
    const changeExpenseDte = () => {
        const body = {
            payableDate: date
        }
        const url = `${server_url_v2}/expense-calculate-sub-item/${id}`
        ModalUpdateMethodHook(url, body, refetch, setLoading, setEditExpenseModalOpen)
    }


    return (
        <div className='w-[300px] md:w-[500px]'>
            <h1 className='text-xl font-bold mb-7'>Change Your Expense Date</h1>
            <form onSubmit={handleSubmit(changeExpenseDte)}>
                <div id='modal_date' className="w-full mt-4">
                    <p className='text-sm mb-1 font-bold'>Add New Date*</p>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        required
                        placeholderText="Select Date"
                        className="w-full border border-gray-300 rounded-md pl-2 pr-8 py-2.5 "
                    />
                </div>
                <div className=' mt-10 mb-5'>
                    <button type='submit' className={`btn border-none bg-primary text-white `}>{loading ? <CustomButtonLoading/> : `Save`}</button>
                </div>
            </form>
        </div>
    );
};

export default ChangeExpenseDate;