import React, {useEffect, useState} from "react";

function TablePagination({page, totalPages, toPage}){

    const [pageNumbers, setPageNumbers] = useState([1]);

    useEffect(() => {
        const newPageNumbers = [];

        const groupSize = 5;

        const currentGroup = Math.floor((page - 1) / groupSize);
        const startPage = currentGroup * groupSize + 1;
        const endPage = Math.min(startPage + groupSize - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            newPageNumbers.push(i);
        }

        setPageNumbers(newPageNumbers);
    }, [page, totalPages]);

    return(
        <nav className="d-flex justify-content-center">
            <ul className="pagination">
                {page > 1 ? (
                    <li className="page-item">
                        <button className="page-link" onClick={() => toPage(page - 1)}>
                            <span>&laquo;</span>
                        </button>
                    </li>
                ) : (<></>)}
                
                
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${number === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => toPage(number)}>
                            {number}
                        </button>
                    </li>
                ))}
                
                {page < totalPages ? (
                    <li className="page-item">
                        <button className="page-link" onClick={() => toPage(page + 1)}>
                            <span>&raquo;</span>
                        </button>
                    </li>
                ) : (<></>)}
            </ul>
        </nav>
    );
}

export default TablePagination;