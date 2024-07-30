import React, { useEffect, useState } from 'react';
import Pathaw from './Pathaw';
import SteadFast from './SteadFast';
import CustomModal from '../../../Shared/CustomModal';
import Image from 'next/image';
import { useContext } from 'react';
import CreateContext from '../../CreateContex';

const SentToModal = ({ order, refetch, modalIsOpen, setIsOpen }) => {
    const [activeTab, setActiveTab] = useState("SteadFast")
    const { siteApiSettingData, setSiteApiSettingData } = useContext(CreateContext)




    return (
        <>
            <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} >
                <div className=''>
                    <div className="">
                        <div className="lg:w-[900px] w-full px-0 py-2 md:p-5">
                            <div className='flex items-center mt-8 gap-2 flex-wrap'>
                                {/* ======Stead Fast tab button=======  */}
                                <button disabled={siteApiSettingData?.data?.steadFastSecretKey && siteApiSettingData?.data?.steadFastApiKey ? false : true} onClick={() => setActiveTab("SteadFast")} className={`mb-2 flex items-center gap-1  font-bold px-5 py-2  rounded-md ${activeTab === "SteadFast" ? " bg-primary text-white" : "bg-primary/20 "} ${siteApiSettingData?.data?.steadFastSecretKey && siteApiSettingData?.data?.steadFastApiKey ? " cursor-pointer" : " cursor-not-allowed"}`}>
                                    <Image
                                        src={"/assets/courier/steadFastLogo1.jpg"}
                                        width={300}
                                        height={300}
                                        className="w-5 h-5 rounded-full"
                                        alt="steadFastLOGO"
                                    />
                                    SteadFast

                                </button>

                                {/* ======Patho tab button=======  */}
                                <button 
                                disabled={siteApiSettingData?.data?.pathaoApiAccessToken && siteApiSettingData?.data?.pathaoApiBaseUrl && siteApiSettingData?.data?.pathaoApiStoreId ? false : true} 
                                onClick={() => setActiveTab("Pathao")} className={` mb-2   flex items-center gap-1  font-bold px-5 py-2  rounded-md ${activeTab === "Pathao" ? " bg-primary text-white" : "bg-primary/20 "} ${siteApiSettingData?.data?.pathaoApiAccessToken && siteApiSettingData?.data?.pathaoApiBaseUrl && siteApiSettingData?.data?.pathaoApiStoreId ? " cursor-pointer" : "cursor-not-allowed"}`}>

                                    <Image
                                        src={"/assets/courier/pathaoLogo.png"}
                                        width={300}
                                        height={300}
                                        className="w-5 h-5 rounded-full"
                                        alt="steadFastLOGO"
                                    />
                                    Pathao

                                </button>
                            </div>
                            {

                                activeTab === "Pathao" &&
                                <div>
                                    {/* ======Pathaw component=======  */}
                                    <Pathaw  setIsOpen={setIsOpen} order={order} refetch={refetch} siteApiSettingData={siteApiSettingData} />
                                </div>
                            }
                            {
                                activeTab === "SteadFast" &&
                                <div>
                                    {/* ======SteadFast component=======  */}
                                    <SteadFast setIsOpen={setIsOpen} order={order} refetch={refetch} siteApiSettingData={siteApiSettingData} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </CustomModal>

        </>
    );
};

export default SentToModal;