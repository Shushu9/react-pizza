import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';
import React from 'react';

type PaginationProps = {
    currentPage: number,
    setCurrentPage: (elem: number) => void,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;