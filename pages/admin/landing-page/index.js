import React from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useFetchVersionTwo } from '../../../src/hooks/usePublicFetchVersionTwo';
import AllPageData from '../../../src/Components/Admin/LandingPage/AllPageData';

const index = () => {
    const { data: pages, isLoading, refetch } = useFetchVersionTwo(['landing-page'], 'landing-page')
    const allPages = pages?.data?.result
    return (
        <>
            <DashboardLayout>
                <div className='mid-container'>
                    <div className="p-7 bg-white mt-5 rounded flex justify-between items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-semibold">Manage Landing Page</h1>
                    </div>
                    <div className='mt-5 w-32'>
                        <Link href={'/admin/landing-page/add-page'} className='text-white bg-orange-500 rounded px-2 py-1 flex items-center gap-1 font-bold text-sm'><span><Icon icon="mdi:add-bold" /></span><span>Create Page</span></Link>
                    </div>
                    <div className="mt-6">
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-[#f3f3f3] text-start">S/N</th>
                                        <th className="bg-[#f3f3f3] text-start">Title</th>
                                        <th className="bg-[#f3f3f3] text-start">View</th>
                                        <th className="bg-[#f3f3f3] text-start">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPages?.map((page, index) => (
                                        <AllPageData
                                            key={index}
                                            page={page}
                                            index={index}
                                            refetch={refetch}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>

        </>
    );
};

export default index;