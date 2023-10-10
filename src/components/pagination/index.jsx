import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

const Pagination = ({ currentPage, setCurrentPage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1} //прочесть об этом элементе

            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;