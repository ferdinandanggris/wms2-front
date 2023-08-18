import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from "react-bootstrap/Pagination";

const PagingComponent = ({ currentPage, limit, total, onPageChange }) => {
    const pages = [];
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = limit * currentPage;

    let beginPage = 1;
    let endPage = 5;
    let lastPage = Math.ceil(total / limit);
    let maxVisiblePage = 5;

    if (currentPage > lastPage) {
        currentPage = lastPage;
    } else if (currentPage < 1) {
        currentPage = 1;
    }

    if (lastPage <= 5) {
        beginPage = 1
        endPage = lastPage;
    }

    if (lastPage >= 6) {
        if (currentPage > 4) {
            if (currentPage < lastPage) {
                beginPage = (currentPage - maxVisiblePage) + 2;
                endPage = (currentPage - maxVisiblePage) + maxVisiblePage + 1;
            } else {
                beginPage = lastPage - 4;
                endPage = lastPage;
            }
        }
        else {
            beginPage = 1;
            endPage = maxVisiblePage;
        }
    }

    for (let i = beginPage; i <= endPage; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => onPageChange(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return total > 10 ? (
        <div className="form-inline">
            {/* Tampilkan data */}
            {/* Tampilkan komponen paging */}
            <Pagination>
                <Pagination.First onClick={() => onPageChange(1)} />
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1 < 1 ? 1 : currentPage - 1)} />
                {pages}
                <Pagination.Next onClick={() => onPageChange(currentPage + 1 > lastPage ? currentPage : currentPage + 1)} />
                <Pagination.Last onClick={() => onPageChange(lastPage)} />
            </Pagination>
            <span className="ml-2 mb-3">Showing {startItem} to {endItem} out of {total} items</span>
        </div>
    ) : (<div></div>);
};

export default PagingComponent;
