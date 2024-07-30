import React from 'react';
import { useQuery } from 'react-query';
import {useEffect, useState } from "react";
import { server_url_v3 } from '../../../lib/config';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import MagazineTableRow from '../../../src/Components/Admin/Magazine/MagazineTableRow';
import AdminDashboardBreadcrumb from '../../../src/Shared/AdminDashboardBreadcrumb';
import dynamic from "next/dynamic";
const ReactPaginate = dynamic(() => import("react-paginate"), {
    loading: () => <p>Loading...</p>,
  });
const index = () => {
    const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
    const { data, refetch } = useQuery({
        queryKey: ["magazineData"],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom?modelName=Blog`
            ).then((res) => res.json()),
    });
    const magazineData = data?.data?.result;
    const itemsPerPage = 10;
// comment
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(magazineData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(magazineData?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, magazineData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products?.length;
    setItemOffset(newOffset);
  };
    // console.log(magazineData)
    return (
        <>
            <DashboardLayout>
                <AdminDashboardBreadcrumb
                    title={"All Blogs"}
                />
                <div className='w-full  mx-auto my-5'>
                    <div className="overflow-x-auto border shadow-md bg-white rounded-2xl">
                        <table className="table table-compact w-full">
                            <thead className="">
                                <tr>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        Image
                                    </th>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        Title
                                    </th>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {magazineData?.length > 0 ? <>
                                    {magazineData?.map((f, index) => (
                                        <>
                                            {" "}
                                            <MagazineTableRow key={index} data={f} refetch={refetch} />
                                        </>
                                    ))}
                                </> : <>
                                    <div className='flex items-center px-5 h-[10vh]'>
                                        <p className='text-gray-600 text-lg'>No Blog Yet</p>
                                    </div>
                                </>}

                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center">
              {/* paginate */}

              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="btn-group pagination "
                pageLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  text-black"
                previousLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  text-black"
                nextLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  text-black"
                activeClassName="pagination-active"
              />
            </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default index;