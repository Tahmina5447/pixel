import React from 'react';
import CustomModal from '../../Shared/CustomModal';
import Image from 'next/image';

const OrderDetailsModal = ({ product, openOrderDetailsModal, setOpenOrderDetailsModal }) => {
    return (
        <>
            <CustomModal
                modalIsOpen={openOrderDetailsModal}
                setIsOpen={setOpenOrderDetailsModal}
            >
                {/* <div className='my-2 w-full mx-auto lg:w-2/3'>
                    <div className='flex items-center justify-center'>

                    </div>
                    <div className='my-5'>
                        <h1 className='text-lg font-bold text-center text-primary'>{product?.name}</h1>
                        <div className='mt-5 w-full mx-auto'>
                            <p className="shadow-sm py-1 px-2 rounded-sm flex justify-between items-center font-bold">Price: <span className='font-normal'>৳{product?.originalProductPrice}.00</span></p>
                            <p className="shadow-sm py-1 px-2 flex justify-between items-center rounded-sm font-bold">Quantity: <span className='font-normal'>{product?.quantity}</span></p>
                            <p className="shadow-sm py-1  px-2 flex justify-between items-center rounded-sm text-orange-500 font-bold">Category: <span className='font-normal text-black'> {product?.category}</span></p>

                        </div>
                    </div>
                </div> */}
                <div>
                    <div className="w-full overflow-scroll">
                        <div className="md:flex gap-5 bg-white shadow-sm mb-5 mt-2 sm:p-5 rounded-xl">
                            <div className="w-full md:w-1/2">
                                <Image
                                    src={product?.imageURL}
                                    width={300}
                                    height={300}
                                    className="h-[300px] mx-auto  object-cover"
                                    alt="Product Image"
                                />
                            </div>
                            <div className="w-full md:w-1/2 mt-5 md:mt-0">
                                <h1 className=" font-semibold text-2xl">{product?.name}</h1>
                                <p className=" mb-2 text-primary font-bold">
                                    Category: <span className="text-black text-xs">{product?.category}</span>
                                </p>
                                <hr />

                                <p className="uppercase font-semibold line-through text-xl mt-5">
                                    {product?.originalProductPrice} ৳
                                </p>
                                <h1 className="uppercase font-semibold  text-3xl mt-5">
                                    {product?.price} ৳
                                </h1>

                                <div className="flex font-bold">
                                    <p>Quantity: </p>
                                    <span className='ml-2'>{product?.quantity}</span>
                                </div>
                                {product?.color && (
                                    <p className="flex items-center font-bold gap-1">
                                        Color:
                                        <span
                                            className="w-4 h-4 rounded-full ml-1 inline-block "
                                            style={{ background: product?.color }}
                                        ></span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default OrderDetailsModal;