import React from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import { useQuery } from 'react-query';
import AdminDashboardBreadcrumb from '../../../src/Shared/AdminDashboardBreadcrumb';
import { server_url_v3 } from '../../../lib/config';
import NoticeTableRow from '../../../src/Components/Admin/Notice/NoticeTableRow';

const Notice = () => {
    const { data, refetch } = useQuery({
        queryKey: ["noticeData"],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom?modelName=Notice`
            ).then((res) => res.json()),
    });
    const noticeData = data?.data?.result;
    console.log(noticeData)
    return (
        <>
            <DashboardLayout>
                <AdminDashboardBreadcrumb
                    title={"All Notice"}
                />
                <div className='w-full md:w-11/12 mx-auto my-5'>
                    <div className="overflow-x-auto border shadow-md bg-white rounded-lg">
                        <table className="table table-compact w-full">
                            <thead className="">
                                <tr>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        No.
                                    </th>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        Notice
                                    </th>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {noticeData?.length > 0 ? <>
                                    {noticeData?.map((f, index) => (
                                        <>
                                            {" "}
                                            <NoticeTableRow index={index} key={index} data={f} refetch={refetch} />
                                        </>
                                    ))}
                                </> : <>
                                    <div className='flex items-center px-5 h-[10vh]'>
                                        <p className='text-gray-600 text-lg'>No Notice Yet</p>
                                    </div>
                                </>}

                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Notice;