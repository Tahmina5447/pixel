import React from 'react';

const MoneyCard = ({ title, amount, icon, iconColor = "" }) => {
    return (

        <div className="rounded-md shadow-md">
            {/* customStyle?.mainBg */}
            <div className="bg-white p-3 rounded-md">
                <div className=" flex items-center justify-between">
                    <div className="">
                        <p className="text-xs text-slate-600 uppercase">{title}</p>
                        <p className="font-bold">  ৳{amount}</p>
                    </div>
                    <div>
                        <div className={`${iconColor} h-12 w-12 rounded-md  flex justify-center items-center`}>
                            {icon}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MoneyCard;