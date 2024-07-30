import React from 'react';

const DashboardCardBg = ({ children }) => {
    return (
        <div className='bg-white w-full p-2 md:p-4 shadow-md'>
            {children}
        </div>
    );
};

export default DashboardCardBg;