import React from 'react';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import { server_url_v4 } from '../../../lib/config';
import { useQuery } from 'react-query';
import ReviewTableItems from '../../../src/Components/Admin/Review/ReviewTableItems';

const Review = () => {

  const { data, isLoading, isError,refetch } = useQuery('reviewData', async () => {
    const response = await fetch(`${server_url_v4}/review/get-admin`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  const reviews=data?.data
  // console.log(reviews)
    return (
        <DashboardLayout>
            <div className="overflow-x-auto mt-5 bg-white">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="bg-[#f3f3f3] text-center">Image</th>
                  <th className="bg-[#f3f3f3] text-center">Product Name</th>
                  <th className="bg-[#f3f3f3] text-center">Name</th>
                  <th className="bg-[#f3f3f3] text-center">Comment</th>
                  <th className="bg-[#f3f3f3] text-start">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {reviews?.length==0 ? <><p className="text-lg my-3 px-5 text-black/70">No Review Yet</p></>:<>
                {reviews?.map((review, index) => (
                  <ReviewTableItems
                    key={review._id}
                    review={review}
                    index={index}
                    refetch={refetch}
                  />
                ))}
                </>}
               
              </tbody>
            </table>
            <div className="flex justify-center">
              {/* paginate */}

              {/* <ReactPaginate
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
              /> */}
            </div>
          </div>
        </DashboardLayout>
    );
};

export default Review;