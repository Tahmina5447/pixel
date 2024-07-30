import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const CustomPagination = ({
  arrayData,
  setCurrentItems,
  itemsPerPage = 10,
  
}) => {
  // ---------------for pagination-----------------------
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  // ---------------for pagination-----------------------

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(arrayData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(arrayData?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, arrayData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % arrayData?.length;
    setItemOffset(newOffset);
  };



  return (
    <>
      {arrayData?.length > itemsPerPage && (
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
            pageLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb]  hover:text-white  text-black"
            previousLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white  text-black"
            nextLinkClassName="btn btn-sm bg-white hover:bg-[#5ab1bb] hover:text-white  text-black"
            activeClassName="pagination-active"
          />
        </div>
      )}
    </>
  );
};

export default CustomPagination;
