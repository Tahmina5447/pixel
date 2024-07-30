import React, { useEffect, useState } from 'react'
import { convertTimestamp } from '../../../../../lib/convertTimestampDateAndTime';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import ReturnBalanceModal from '../Category/ReturnBalanceModal';
import CustomModal from '../../../../Shared/CustomModal';
import { server_url_v2 } from '../../../../../lib/config';
import { totalReturnOfExpense } from '../../../../../lib/totalReturnOfExpense';

const HistoryCard = ({ account, categoryTitle, refetch,returnAllData,returnRefetch }) => {
    const [returnModalOpen, setReturnModalOpen] = useState(false)
    const [showNote, setShowNote] = useState(false) 
    const { date, time } = convertTimestamp(account.createdAt);
    const totalReturn = totalReturnOfExpense(account._id, returnAllData)

    return (
        <div className='border-b bg-gray-100 py-3 px-[2px] md:px-3 overflow-hidden'>
            <div className='flex justify-center '>
                <div className='w-2/12 md:w-1/12 mt-2'>
                    <div className='flex items-center justify-center'>
                        <div className={`
                        ${account.type === 'expense' && 'bg-[#f0cfcd] text-red-400'}
                        ${account.type === 'income' && 'bg-[#cdf0e4] text-primary'}
                        ${account.type === 'return' && 'bg-[#f0ebcd] text-yellow-400'}
                        ${account.type === undefined && 'bg-[#cdd5f0] text-blue-400'}
                         p-2 rounded-md `}>
                            {
                                account?.type ? (

                                    <>
                                        {
                                            account.type === 'expense' && <Icon className='text-[20px] ' icon="fluent-mdl2:sell" />
                                        }
                                        {
                                            account.type === 'income' && <Icon className='text-[20px] ' icon="game-icons:profit" />
                                        }
                                        {
                                            account.type === 'return' && <Icon className='text-[20px] ' icon="fluent-mdl2:return-key" />
                                        }


                                    </>

                                ) : (<>
                                    <Icon className='text-[20px] ' icon="grommet-icons:update" />
                                </>)
                            }
                        </div>
                    </div>
                </div>
                <div className='w-10/12 md:w-11/12'>
                    <div className='flex items-start justify-between gap-2 flex-col sm:flex-row'>
                        <div>
                            <h3 className='font-bold text-gray-700'>{account.historyTitle}</h3>
                            <div className='flex items-center gap-1 mt-[-4px]'>
                                <p className=''><span className='font-extrabold uppercase text-[10px]'>{account?.type}:</span><span className=' font-bold text-gray-500 text-xs'> ৳{account.historyAmount - totalReturn}</span></p>
                                {
                                    totalReturn > 0 && <div className='flex items-center'>
                                        <h1 className='text-xs mr-2 ml-1'>|</h1>
                                        <p className=''><span className='font-extrabold uppercase text-[10px]'>Return:</span><span className=' font-bold text-gray-500 text-xs'> ৳{totalReturn}</span></p>
                                    </div>
                                }


                            </div>
                        </div>
                        <div>
                            <span className='text-[12px] font-bold'>{time} {date}</span>
                            {
                                account?.type && <div className='hidden sm:flex items-center gap-1 '>
                                    <div className={`w-[10px] h-[10px] rounded-full ${account.type === 'expense' && " bg-red-400" || account.type === 'income' && " bg-green-400" || account.type === 'return' && " bg-yellow-400"}`}>
                                    </div>
                                    <span className='text-[14px] font-bold'>{account?.type}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-1 mt-1'>
                        {
                            account.note && <div>
                                <Tooltip anchorSelect="#see_note">
                                    See Note
                                </Tooltip>
                                <button id='see_note' onClick={() => setShowNote(pre => !pre)} className='  mt-1 w-[45px] border border-primary px-1 text-primary text-[10px] rounded flex items-center justify-between hover:text-white hover:bg-primary'>Note <Icon icon="mingcute:up-line" className={`text-[10px] duration-300 mt-0 ${showNote ? " " : " rotate-180"}`} /></button>
                            </div>
                        }
                        {/* -------------return expense money from category history--------------- */}
                        {
                            categoryTitle ? <>
                                {
                                    account?.type === "expense" && <>
                                        <Tooltip anchorSelect="#expense_return">
                                            Return Balance
                                        </Tooltip>
                                        <button id='expense_return' onClick={() => setReturnModalOpen(true)} className='  mt-1 w-[55px] border border-yellow-600  px-1 text-yellow-600 text-[10px] rounded flex items-center justify-between hover:text-white hover:bg-yellow-600 gap-1 '>Return <Icon icon="grommet-icons:return" className={`text-[10px]   mt-0`} /></button>
                                    </>
                                }
                            </> : <>

                            </>
                        }
                    </div>
                    <div className={`${showNote ? "h-[40px] " : "h-[0]  "} duration-300 transition-all`}>
                        <h2 className='pt-3 text-sm font-bold'>Note : <span className='text-xs text-normal'>{account?.note}</span></h2>
                    </div>
                </div>
            </div>
            <CustomModal
                modalIsOpen={returnModalOpen}
                setIsOpen={setReturnModalOpen}
            >
                <ReturnBalanceModal
                    setReturnModalOpen={setReturnModalOpen}
                    id={account?._id}
                    refetch={refetch}
                    returnRefetch={returnRefetch}
                    expense={account.historyAmount}
                    categoryId={account?.category}
                    returnHistory={returnAllData}
                />
            </CustomModal>


        </div>
    )
}

export default HistoryCard