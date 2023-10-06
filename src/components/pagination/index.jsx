import { useState } from 'react'
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

const Pagination = () => {


    const [itemOffset, setItemOffset] = useState(0);

    const handlePageClick = (event) => {
        // const newOffset = (event.selected * 8) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;