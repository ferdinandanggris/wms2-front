import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from "react-bootstrap/Pagination";

const PagingComponent = ({ currentPage, limit, total, onPageChange }) => {
    const pages = [];
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = limit * currentPage;

    let beginPage = 1;
    let pagingCount = 5;
    let lastPaging = Math.ceil(total / limit);


    if (currentPage == lastPaging) {
        beginPage = currentPage - 4;
        pagingCount = currentPage;
    } else if (pagingCount <= currentPage) {
        let lastCount = lastPaging - currentPage;
        if (lastCount < 2) {
            pagingCount = currentPage + lastCount;
            beginPage = pagingCount - (5 - lastCount);
        }
        else {
            pagingCount = currentPage + 2;
            beginPage = currentPage - 2;
        }
    }
    for (let i = beginPage; i <= pagingCount; i++) {
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
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
                {pages}
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
                <Pagination.Last onClick={() => onPageChange(lastPaging)} />
            </Pagination>
            <span className="ml-2 mb-3">Showing {startItem} to {endItem} out of {total} items</span>
        </div>
    ) : (<div></div>);
};

export default PagingComponent;
