import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from "react-bootstrap/Pagination";

const PagingComponent = ({ totalPages, currentPage, onPageChange, limit, total }) => {
    const pages = [];
    const itemsPerPage = limit; // Jumlah item per halaman
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = limit * currentPage;

    let beginPage = 1;
    if (totalPages <= currentPage) {
        totalPages = currentPage + 2;
        beginPage = currentPage - 5;
    }
    for (let i = beginPage; i <= totalPages; i++) {
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

    return (
        <div className="form-inline" style={{ display: 'block', width: 700, padding: 30 }}>
            {/* Tampilkan data */}
            {/* Tampilkan komponen paging */}
            <Pagination>
                <Pagination.First onClick={() => onPageChange(1)} />
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
                <Pagination.Ellipsis />
                {pages}
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
                <Pagination.Ellipsis />
                <Pagination.Last onClick={() => onPageChange(totalPages)} />
            </Pagination>
            <span className="ml-2 mb-3">Showing {startItem} to {endItem} out of {total} items</span>
        </div>
    );
};

export default PagingComponent;
