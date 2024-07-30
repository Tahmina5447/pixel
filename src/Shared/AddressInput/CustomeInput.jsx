import React from 'react'

const CustomeInput = ({ lable, type, onKeyUp, regester, name, placeholder }) => {
    return (
        <>
            <div htmlFor="" className="w-full  ">
                <label htmlFor="name" className="leading-7 text-sm font-bold ">
                    {lable}
                </label>
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    {...regester}
                    className=' shadow-sm border outline-none focus:border-primary  bg-white  text-black w-full p-3 flex items-center justify-between rounded-lg' />
            </div>
        </>
    )
}

export default CustomeInput