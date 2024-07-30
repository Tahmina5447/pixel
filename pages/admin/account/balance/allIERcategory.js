import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';
import { useFetchVersionTwo } from '../../../../src/hooks/usePublicFetchVersionTwo';
import { useState } from 'react';
import CategoryCard from '../../../../src/Components/Admin/Acount/Category/CategoryCard';
import LoadingComponets from '../../../../src/Shared/LoadingComponets';
import DashboardLayout from '../../../../src/Components/DashboardLayout';
import AdminDashboardBreadcrumb from '../../../../src/Shared/AdminDashboardBreadcrumb';

const allIERcategory = () => {
    const [fetchQuery, setFetchQuery] = useState('expense-category')
    const { data: categories, isLoading, refetch } = useFetchVersionTwo([fetchQuery], fetchQuery)
    const allCategories = categories?.data?.result

    const handleSearch = (value) => {
        let query = `expense-category?search=${value}`
        setFetchQuery(query)
    }
    return (
        <>
            <DashboardLayout>

                <section className="mt-8 mb-16">
                    <AdminDashboardBreadcrumb
                        title={"Expenses & Income Category OverView"}
                        subtitle={
                            ""
                        }
                    />
                    {/* <div className='flex items-center justify-between md:gap-4 bg-white shadow-md rounded-md'>
                        <Link href={'/admin/account/balance/category'} className='text-white bg-primary font-medium p-2 rounded-md flex items-center'><Icon icon="mingcute:arrow-left-line" />Back</Link>

                        <h3 className="text-center text-lg md:text-lg font-bold uppercase  font-serif">
                            Your IER Category OverView
                        </h3>
                    </div> */}

                    <div className='mt-5'>
                        <div className=" mb-5 flex items-center justify-end">
                            <input
                                onChange={(e) => handleSearch(e.target.value)}
                                type="input"
                                placeholder="Search ..."
                                className="input input-bordered "
                            />
                        </div>
                        {!isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                                {
                                    allCategories?.length ? (

                                        allCategories?.map((category, index) => (
                                            <CategoryCard
                                                category={category}
                                                key={index}
                                                refetch={refetch}
                                            />
                                        ))

                                    ) : (
                                        <div className='flex items-center justify-center drop-shadow-sm py-4 bg-gray-100 rounded-lg px-5 text-center'>
                                            <h2 className=' text-[18px] font-extrabold'>Category Not Found! </h2>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <LoadingComponets />
                        )}
                    </div>
                </section>
            </DashboardLayout>
        </>

    );
};

export default allIERcategory;