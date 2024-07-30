import React from 'react';
import { useFetchVersionTwo } from '../../../src/hooks/usePublicFetchVersionTwo';
import PublicAllPage from '../../../src/Components/Admin/LandingPage/PublicAllPage';

const landingPage = () => {
    const { data: pages, isLoading, refetch } = useFetchVersionTwo(['landing-page'], 'landing-page')
    const allPages = pages?.data?.result
    return (
        <div>
            <div className='mid-container'>
                    <div className="mt-6">
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-[#f3f3f3] text-start">S/N</th>
                                        <th className="bg-[#f3f3f3] text-start">Title</th>
                                        <th className="bg-[#f3f3f3] text-start">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPages?.map((page, index) => (
                                        <PublicAllPage
                                            key={index}
                                            page={page}
                                            index={index}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default landingPage;