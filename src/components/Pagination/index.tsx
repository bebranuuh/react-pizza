import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: (e: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
