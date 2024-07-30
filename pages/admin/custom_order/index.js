import React from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import Users from '../../../src/Components/Admin/CustomOrder/Users';
import { useState } from 'react';
import UserInformation from '../../../src/Components/Admin/CustomOrder/UserInformation';
import { Icon } from '@iconify/react';
import CustomModal from '../../../src/Shared/CustomModal';
import SelectProduct from '../../../src/Components/Admin/CustomOrder/SelectProduct';
import ProductDrawer from '../../../src/Shared/drawer/ProductDrawer';


const index = () => {
    const [selectedUser, setSelectedUser] = useState({})
    const [selectProductModalOpen, setSelectProductModalOpen] = useState(false)
    const [getProductId, setGetProductId] = useState([])
    const [show, setShow] = useState(false)

    // use for open cart drawer
    const toggleDrawer = () => {
        setShow(!show);
    };

    return (
        <>
            <DashboardLayout>
                <div className='bg-white font-bold my-5  p-7  shadow-md rounded-md flex items-center justify-between'>
                    <h1 className='text-2xl'>Create Custom Order</h1>
                    {/* <button onClick={() => setSelectProductModalOpen(true)} className='font-bold text-white rounded-md bg-primary p-2 flex items-center gap-1'> <Icon icon="ooui:add" />Select Product</button> */}
                </div>
                <div className='mb-5 w-full'>
                    {/* --------------------search or add new user------------------- */}
                    <div className='mb-5 w-full md:flex items-center gap-5'>
                        <div className='w-full'>
                            <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                        </div>
                        <div className='w-full mt-5 md:mt-0'>
                            <SelectProduct setGetProductId={setGetProductId} setShow={setShow} getProductId={getProductId} />
                        </div>
                    </div>
                    {/* ---------------------here will be post order----------------------- */}
                    <UserInformation getProductId={getProductId} setGetProductId={setGetProductId} user={selectedUser} />

                </div>
            </DashboardLayout>
            <CustomModal
                modalIsOpen={selectProductModalOpen}
                setIsOpen={setSelectProductModalOpen}
            >
                <SelectProduct setSelectProductModalOpen={setSelectProductModalOpen} />
            </CustomModal>

            <ProductDrawer
                isOpen={show}
                toggleDrawer={toggleDrawer}
                dir={"right"}
                setGetProductId={setGetProductId}
                getProductId={getProductId}
            />
        </>
    );
};

export default index;