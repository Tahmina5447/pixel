import React from 'react';
import CustomModal from '../../../../Shared/CustomModal';
import { useForm } from 'react-hook-form';
import { ModalPostMethodHook } from '../../../../../lib/usePostHooks';
import { useState } from 'react';
import { base_url_v2 } from '../../../../../lib/helper';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';

const AddCategoryModal = ({ setAddCategoryModalOpen, refetch }) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm();
    const addCategory = (data) => {
        const url = `${base_url_v2}/expense-category`
        const body = {
            title: data?.categoryName
        }
        ModalPostMethodHook(url, body, refetch, setLoading, setAddCategoryModalOpen)
        reset();
    }
    return (
        <>
            <div className='md:w-[800px] w-full py-5'>
                <h2 className=' text-[25px] font-bold'>Add New Category :</h2>
                <form onSubmit={handleSubmit(addCategory)} className='mt-5 border p-3 md:p-6 rounded-md'>
                    <div className=' w-full'>
                        {/* ---------add category name---------- */}
                        <CustomeInput
                            lable={<p>Category Name : </p>}
                            type={"text"}
                            name={"categoryName"}
                            placeholder={"Enter Category Name"}
                            regester={register("categoryName", { required: "Category Name is required"})}
                            onKeyUp={(e) => { trigger("categoryName") }}
                        />
                        <small className="text-[#FF4B2B] text-xs font-medium my-2">
                            {errors?.categoryName?.message}
                        </small>
                        {/* {errors.categoryName && errors.categoryName.type === "maxLength" && (
                            <span  className='text-[#FF4B2B] text-xs font-medium my-2' role="alert">Max length 150 character</span>
                        )}
                        {errors.categoryName && errors.categoryName.type === "minLength" && (
                            <span className='text-[#FF4B2B] text-xs font-medium my-2' role="alert">Max length 2 character</span>
                        )} */}
                    </div>

                    <div className=' mt-10 mb-5'>
                        <button type='submit' className={`btn bg-primary border-none text-white `}>{loading ? <CustomButtonLoading/> : "Save"}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCategoryModal;