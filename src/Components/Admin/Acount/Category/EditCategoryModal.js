import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalUpdateMethodHook } from '../../../../../lib/usePostHooks';
import { base_url_v2 } from '../../../../../lib/helper';
import CustomeInput from '../../../../Shared/AddressInput/CustomeInput';
import CustomButtonLoading from '../../../../Shared/CustomButtonLoading';

const EditCategoryModal = ({ setEditCategoryModalOpen, id, refetch, title }) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
        reset,
    } = useForm({
        defaultValues: {
            categoryName: title
        }
    });
    const editCategory = (data) => {
        const url = `${base_url_v2}/expense-category/${id}`
        const body = {
            title: data?.categoryName
        }
        ModalUpdateMethodHook(url, body, refetch, setLoading, setEditCategoryModalOpen)
        // reset();
    }
    return (
        <>
            <div className='md:w-[800px] w-full py-5'>
                <h2 className=' text-[25px] font-bold uppercase'>Update <span className='text-primary'>{title}</span> Category Name :</h2>
                <form onSubmit={handleSubmit(editCategory)} className='mt-5 border p-3 md:p-6 rounded-md'>
                    <div className=' w-full'>
                        {/* ---------add category name to update category---------- */}
                        <CustomeInput
                            lable={<p>Category Name : </p>}
                            type={"text"}
                            name={"categoryName"}
                            placeholder={"Enter Category Name"}
                            regester={register("categoryName", { required: "Category Name is required", })}
                            onKeyUp={(e) => { trigger("categoryName") }}
                        />
                        <small className="text-[#FF4B2B] text-xs font-medium my-2">
                            {errors?.categoryName?.message}
                        </small>
                    </div>

                    <div className=' mt-10 mb-5'>
                        <button type='submit' className={`btn bg-primary border-none text-white `}>{loading ? <CustomButtonLoading/> : "Update"}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategoryModal;