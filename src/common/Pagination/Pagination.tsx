import React from "react";
import s from "./Pagination.module.css";
import {LEFT_PAGE, RIGHT_PAGE} from "./PaginationContainer";

type PaginationPropsType = {
    pageLimit: number
    totalRecords: number
    currentPage: number
    fetchPageNumbers: () => (string | number)[]
    handleClick: (page: number | string) => void
    handleMoveLeft: () => void
    handleMoveRight: () => void
}

export const Pagination: React.FC<PaginationPropsType> = (
    {
        totalRecords,
        pageLimit,
        fetchPageNumbers,
        currentPage,
        handleClick,
        handleMoveLeft,
        handleMoveRight,

    }) => {

    const totalPages = Math.ceil(totalRecords / pageLimit);
    const pages = fetchPageNumbers()
    if (!totalRecords || totalPages === 1) return null

    return (
        <nav className={s.paginationBlock}>
            <div className={s.totalCounter}>
                <span className={s.selectedItem}>{totalRecords}</span> Users
            </div>

            <div className={s.currentPage}>
                Page <span className={s.selectedItem}>{currentPage}</span>/{totalPages}
            </div>

            <ul className={s.totalBlocks}>
                {pages.map((page, index) => {
                    if (page === LEFT_PAGE) return (
                        <li key={index} className={s.pageItem}>
                                <span aria-hidden="true"
                                      onClick={handleMoveLeft}>&laquo;</span>
                        </li>
                    );

                    if (page === RIGHT_PAGE) return (
                        <li key={index} className={s.pageItem}>
                                <span aria-hidden="true"
                                      onClick={handleMoveRight}>&raquo;</span>
                        </li>
                    );

                    return <li key={index}
                            className={`${s.pageItem} ${currentPage === page && s.selectedPage}`}
                            onClick={() => handleClick(page)}>
                            {page}
                        </li>
                })}
            </ul>
        </nav>
    )
}
