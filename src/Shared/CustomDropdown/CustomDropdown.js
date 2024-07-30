import React from 'react';

const CustomDropdown = ({ setData, dropdownData = [] }) => {

    return (
        <div className="">
            <div className="w-full ">

                <div className=" border   text-black  w-full  p-1 flex items-center justify-between rounded cursor-pointer ">
                    <select
                        onChange={(event) => setData(event.target.value)}
                        className="w-full text-black rounded py-2.5 px-3"
                        placeholder='Select Your order source'
                    >
                        {dropdownData.map(opt => {
                            return <option value={opt?.value || opt.label}>
                                {opt.label}
                            </option>
                        })}
                        
                    </select>

                </div>
            </div>
        </div>
    );
};

export default CustomDropdown;