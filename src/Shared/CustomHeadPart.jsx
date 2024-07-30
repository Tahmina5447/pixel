import { Icon } from "@iconify/react";
import React from "react";
import CustomModal from "./CustomModal";
import AddMainExpenseCard from "../Components/Admin/Acount/ExpenseCalculate/AddMainExpenseCard";
import { useState } from "react";


const CustomHeadPart = ({title,refetch}) => {
    const [show,setShow] = useState(false)


    return (
        <>
            <div className="p-7 bg-white mt-5 rounded shadow-sm flex flex-col md:flex-row items-center justify-between">
                <div className="flex justify-start items-center gap-5">
                    <div className=" flex items-center gap-2">
                        <h1 className="md:text-2xl text-lg mb-2 md:mb-0 font-semibold">{title}</h1>
                    </div>
                </div>
                {/* <div>
                    <button onClick={()=>setShow(true)} className="btn btn-primary font-bold w-full flex items-center justify-center gap-2 text-white">
                        <Icon icon="mingcute:add-fill" className="text-[20px]" /> Add Expense Card
                    </button>
                </div> */}
            </div>

            <CustomModal modalIsOpen={show} setIsOpen={setShow}>
                <AddMainExpenseCard setIsOpen={setShow} refetch={refetch}/>
            </CustomModal>
        </>
    );
};

export default CustomHeadPart;
