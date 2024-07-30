import React from 'react';
import { useState } from 'react';
import CustomModal from '../../../../Shared/CustomModal';
import EditCategoryModal from './EditCategoryModal';
import { HiDotsVertical } from 'react-icons/hi';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import CreateContext from '../../../CreateContex';
import { useContext } from 'react';
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';

const CategoryCard = ({ category, refetch }) => {
    const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false)
    const [getCategoryId, setCategoryId] = useState(null)
    const {setHistoryName} = useContext(CreateContext)
    const { date, time } = convertTimestamp(category.createdAt);
    const handleCategoryUpdate = (id) => {
        setCategoryId(id);
    }

    // function formatDate(inputDate) {
    //     const date = new Date(inputDate);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const year = date.getFullYear();

    //     return `${day}/${month}/${year}`;
    // }

    // const inputDate = category?.createdAt;
    // const formattedDate = formatDate(inputDate);
    return (
        <>
            <div className='flex items-center '>
                <div className='rounded-md  bg-gradient-to-r from-primary to-[#b3f0db] w-full  shadow-md    flex justify-between relative'>
                    {/* <div id='div1' className='absolute  top-[-90px] right-[47px] rounded-full bg-[#3f907573] h-32 w-32 z-0'></div>
                        <div id='div2' className='absolute  bottom-[-27px] left-[-31px] rounded-full bg-[#3f907573] h-20 w-20 z-0'></div> */}
                    {/* -------------update and history-------------- */}
                    <div className=' m-3 flex flex-col justify-between  text-white w-2/3'>
                        <h1 className='text-lg font-semibold uppercase'>{category?.title}</h1>
                        <p className='text-white font-bold text-sm'>Created: {date}</p>
                    </div>
                    <div className=' w-1/3'>
                        <div className="dropdown dropdown-end flex justify-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                                <HiDotsVertical className='text-primary ' size={20} />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box text-black w-40"
                            >
                                <li>
                                    <div onClick={() => {
                                        handleCategoryUpdate(category?._id);
                                        setEditCategoryModalOpen(true);
                                    }}>Update</div>
                                </li>
                                <li>
                                    <Link onClick={()=>setHistoryName(category?.title)} href={`/admin/account/balance/history/${category._id}`} className="justify-between text-black">
                                        History
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='flex justify-center mb-2'>
                            <Icon className='text-[80px] text-white' icon="dashicons:category" />
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal
                modalIsOpen={editCategoryModalOpen}
                setIsOpen={setEditCategoryModalOpen}
            >
                <EditCategoryModal
                    setEditCategoryModalOpen={setEditCategoryModalOpen}
                    id={getCategoryId}
                    refetch={refetch}
                    title={category?.title}
                />
            </CustomModal>
        </>
    );
};

export default CategoryCard;