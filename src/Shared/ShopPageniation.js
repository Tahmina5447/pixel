import React from 'react';

const ShopPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 5; // Maximum number of pages to show

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="bg-white p-4 flex items-center flex-wrap mt-auto">
            <nav aria-label="Page navigation">
                <ul className="inline-flex">
                    <li>
                        <button
                            className="px-2 py-0 hover:text-white text-primary transition-colors duration-150 bg-white border border-r-0 border-primary rounded-l-lg focus:shadow-outline hover:bg-primary"
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                    </li>
                    {getPageNumbers().map((page, idx) =>
                        page === '...' ? (
                            <li key={idx}>
                                <span className="px-2 block py-0 text-primary transition-colors duration-150 bg-white border border-r-0 border-primary">...</span>
                            </li>
                        ) : (
                            <li key={idx}>
                                <button
                                    className={`px-2 py-0 hover:text-white transition-colors duration-150 ${currentPage === page ? 'text-white bg-primary' : 'text-primary bg-white'} border border-r-0 border-primary focus:shadow-outline ${currentPage === page ? '' : 'hover:bg-primary'}`}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        )
                    )}
                    <li>
                        <button
                            className="px-2 py-0 hover:text-white text-primary transition-colors duration-150 bg-white border border-primary rounded-r-lg focus:shadow-outline hover:bg-primary"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ShopPagination;
