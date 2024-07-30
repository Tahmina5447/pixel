import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomPostMethodHook, ModalPostMethodHook, ModalPostReturnMethodHook } from '../../../../../lib/usePostHooks';
import { server_url_v2 } from '../../../../../lib/config';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { Icon } from '@iconify/react';
import ReturnBlanceHistory from './ReturnBlanceHistory';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';
import { totalReturnOfExpense } from '../../../../../lib/totalReturnOfExpense';

const ReturnBalanceModal = ({ setReturnModalOpen, id, refetch,returnRefetch, expense, returnHistory, categoryId }) => {
    const [loading, setLoading] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState("");
    const [allAccounts, setAllAccounts] = useState([])
    const mainExpense = Number(expense) - Number(returnHistory?.totalReturn)


    const allReturnAmountOfExpneseCategory = returnHistory?.filter(rtn => rtn?.idOfHistory === id)
    const totalOfExpenseReturn = totalReturnOfExpense(id, allReturnAmountOfExpneseCategory)
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm();

    useEffect(() => {
        fetch(`${server_url_v2}/accounts/opening-balance`)
            .then((res) => res.json())
            .then((data) => {
                setAllAccounts(data?.data?.Accounts);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    const handleSelectedAccount = (event) => {
        setSelectedAccount(event.target.value);
    };



    const handleReturnAmount = (data) => {
        const url = `${server_url_v2}/return-expense-money`
        const body = {
            idOfHistory: id,
            returnAmount: data.amount,
            receivedAccountId: selectedAccount,
            note: data.note,
            categoryId: categoryId._id
        }
        ModalPostReturnMethodHook(url, body, refetch = () => { },returnRefetch, setLoading, setReturnModalOpen)
    }

    return (
        <div className='w-[300px] sm:w-[620px] md:w-[700px] lg:w-[1000px] py-5'>
            <h1 className='text-xl mb-10 md:text-3xl font-semibold'>Return Balance</h1>
            <div className='md:flex md:gap-5'>
                <div className='w-full md:w-1/2'>
                    <h1 className=' font-medium mb-5'>Return Your Balance:</h1>
                    <form onSubmit={handleSubmit(handleReturnAmount)} className=' my-5 border p-3 rounded-md'>
                        <div className='md:flex items-center gap-5'>
                            <div className=' w-full my-3 md:my-0'>
                                {/* ======Add Ammount ====== */}
                                <CustomeInput
                                    lable={<p>Amount*</p>}
                                    type={"number"}
                                    name={"amount"}
                                    placeholder={"Enter Amount"}
                                    regester={register("amount", { required: "Amount is required" })}
                                    onKeyUp={(e) => { trigger("amount") }}
                                />
                                <small className="text-[#FF4B2B] text-xs font-medium my-2">
                                    {errors?.amount?.message}
                                </small>
                            </div>
                            <div className=" w-full ">
                                <label htmlFor="name" className="leading-7 text-sm font-bold ">
                                    <p>Account Name*</p>
                                </label>
                                <div className="w-full">
                                    <select
                                        onChange={handleSelectedAccount}
                                        value={selectedAccount}
                                        className=" border px-[5px] py-[11px] rounded-md w-full outline-none  focus:border-primary "
                                        placeholder="Choose Your Account Name"
                                    >
                                        <option hidden>
                                            Select...
                                        </option>
                                        {allAccounts?.map((account, index) => (
                                            <option className=' py-2' value={account._id} key={index}>
                                                {account?.accountName}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className="w-full md:mt-4">
                            <label htmlFor="name" className="leading-7 text-sm font-bold ">
                                Note
                            </label>
                            <textarea
                                name={"note"}
                                placeholder={"Write Note"}
                                {...register("note")}
                                className='shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg'></textarea>
                        </div>

                        <div className='my-5'>
                            <button type='submit' className={`btn border-none bg-primary text-white `}>{loading ? <CustomButtonLoading /> : `Save`}</button>
                        </div>
                    </form>
                </div>
                <div className='w-full md:w-1/2'>
                    <h1 className=' font-medium mb-5'>Balance Return History:</h1>
                    <div className='border rounded-md p-3 '>
                        {allReturnAmountOfExpneseCategory?.length > 0 ? <>
                            {
                                allReturnAmountOfExpneseCategory?.map((history, index) => <ReturnBlanceHistory history={history} index={index} />)
                            }
                        </> : <>
                            <h1 className='text-red-600 font-semibold text-lg text-center'>Data is empty</h1>
                        </>}


                    </div>

                    <div className='border rounded-md p-3 mt-5'>

                        <div className=''>
                            <h1 className=' text-primary font-medium flex justify-between gap-1'>Expense: <span className='text-black'>৳{expense}</span></h1>
                            <h1 className=' text-primary font-medium flex justify-between my-2 gap-1'>Main Expense: <span className='text-black'>৳{expense - totalOfExpenseReturn}</span></h1>
                            <h1 className=' text-primary font-medium flex justify-between gap-1'>Total Return: <span className='text-black'>৳{totalOfExpenseReturn}</span></h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReturnBalanceModal;