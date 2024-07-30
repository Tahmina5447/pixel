import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import { server_url_v2 } from '../../../../../lib/config';
import { CustomPostMethodHook } from '../../../../../lib/usePostHooks';
import { Icon } from '@iconify/react';
import CustomModal from '../../../../Shared/CustomModal';
import AddCategoryModal from './AddCategoryModal';
import Select from "react-select";
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';

const ExpenseIncomeReturn = ({ allCategories, refetch }) => {
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("expense")
    const [loading, setLoading] = useState(false)
    const [allAccounts, setAllAccounts] = useState([])
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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
    const handleSelectedCategory = (event) => {
        setSelectedCategory(event.value);
    }
    const handleAddExpenseAndIncome = (data) => {
        const url = `${server_url_v2}/expenses`
        const body = {
            title: data.title,
            note: data.note,
            category: selectedCategory,
            amount: data.amount,
            fromBalance: selectedAccount,
            type: activeTab
        }
        const successData = {
            reset,
            setSelectedCategory,
            setSelectedAccount,
            setLoading,
        }

        CustomPostMethodHook(url, body, successData)
    }

    return (
        <div className='bg-white shadow-md rounded-md p-5 my-5'>
            <div className='flex'>
                <button onClick={() => setActiveTab("expense")} className={`${activeTab === "expense" ? 'text-primary font-bold border-b-2 border-primary' : 'border-b-2 font-bold '}  py-2 px-8 mr-2 flex items-center gap-2`}><Icon icon="icon-park-outline:expenses-one" /> Expense</button>
                <button onClick={() => setActiveTab("income")} className={`${activeTab === "income" ? 'text-primary font-bold border-b-2 border-primary' : 'border-b-2 font-bold '}  py-2 px-8 flex items-center gap-2`}><Icon icon="icon-park-outline:income-one" />Income</button>
            </div>
            <hr className='h-[2px] mt-[-2px] bg-slate-200' />
            <form onSubmit={handleSubmit(handleAddExpenseAndIncome)} className=' my-5'>
                <h1 className=' font-medium mb-5'>Note Down About Your <span className='text-primary uppercase'>{activeTab} Money :</span></h1>

                <div className='md:flex items-center gap-5'>
                    <div className=' w-full '>
                        {/* ======Add title ====== */}
                        <CustomeInput
                            lable={<p>Title : </p>}
                            type={"text"}
                            name={"title"}
                            placeholder={"Enter Title"}
                            regester={register("title", { required: "Title is required", })}
                            onKeyUp={(e) => { trigger("title") }}
                        />
                        <small className="text-[#FF4B2B] text-xs font-medium my-2">
                            {errors?.title?.message}
                        </small>
                    </div>
                    <div className=' w-full my-3 md:my-0'>
                        {/* ======Add Ammount ====== */}
                        <CustomeInput
                            lable={<p>Amount : </p>}
                            type={"number"}
                            name={"amount"}
                            placeholder={"Enter Amount"}
                            regester={register("amount", { required: "Amount is required", })}
                            onKeyUp={(e) => { trigger("amount") }}
                        />
                        <small className="text-[#FF4B2B] text-xs font-medium my-2">
                            {errors?.amount?.message}
                        </small>
                    </div>
                </div>
                <div className='md:flex items-center gap-5 mt-0 md:mt-3'>
                    <div className=" w-full ">
                        <label htmlFor="name" className="leading-7 text-sm font-bold ">
                            <p>Account Name :</p>
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
                    <div className=" w-full my-3 md:my-0">
                        <label htmlFor="name" className="leading-7 text-sm font-bold ">
                            <p>Category :</p>
                        </label>
                        <div className=" flex w-full">
                            <Select
                                defaultValue={selectedCategory}
                                onChange={handleSelectedCategory}
                                // isMulti
                                name="colors"
                                required
                                options={allCategories?.map((category) => {
                                    return { value: category?._id, label: category?.title };
                                })}
                                className="w-full outline-none py-1 border rounded-md rounded-e-none focus:border-primary "
                                id='choose_account_category'
                                classNamePrefix="select"
                            />
                            <div onClick={() => setAddCategoryModalOpen(true)} className='flex items-center rounded-e-md border hover:bg-white border-s-0 bg-primary px-3'><Icon className='bg-primary cursor-pointer text-white rounded-full' icon="ooui:add" /></div>
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
                        {...register("note", { required: "Note is required", })}
                        onKeyUp={(e) => { trigger("note") }}
                        className='shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg'></textarea>
                    <small className="text-[#FF4B2B] text-xs font-medium my-2">
                        {errors?.note?.message}
                    </small>
                </div>

                <div className=' mt-10 mb-5'>
                    <button type='submit' className={`btn border-none bg-primary text-white `}>{loading ?<CustomButtonLoading/> : `Save`}</button>
                </div>
            </form>

            <CustomModal
                modalIsOpen={addCategoryModalOpen}
                setIsOpen={setAddCategoryModalOpen}
            >
                <AddCategoryModal
                    setAddCategoryModalOpen={setAddCategoryModalOpen}
                    refetch={refetch}
                />
            </CustomModal>
        </div>
    );
};

export default ExpenseIncomeReturn;