import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useHistory } from "react-router-dom";

const Pagination = ({ setPage, currentPage, count, fromPath }) => {
    const history = useHistory();
    console.log(count);
    let pages = [];

    for (let i = 1; i <= Math.ceil(count / 15); i++) {
        pages.push(i);
    }

    return (
        <ul class="pagination justify-content-end mb-0">
            <li class="page-item disabled">
                <span class="page-link" tabindex="-1">
                    <ChevronLeft style={{ width: 14 }} />
                    <span class="sr-only">Previous</span>
                </span>
            </li>
            {pages.map((page) => (
                <li
                    class={currentPage === page ? "page-item active" : "page-item"}
                    onClick={() => {
                        history.push(fromPath + "/" + page);
                        setPage(page);
                    }}
                >
                    <span class="page-link">{page}</span>
                </li>
            ))}

            <li class="page-item">
                <span class="page-link">
                    <ChevronRight style={{ width: 14 }} />
                    <span class="sr-only">Next</span>
                </span>
            </li>
        </ul>
    );
};

export default Pagination;
