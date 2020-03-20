import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import './Pagination.css';

interface Props {
  onArrowClick: Function;
  page: number;
  total: number;
}

export const Pagination = ({ onArrowClick, page, total }: Props) => (
  <div className="pagination">
    <IoIosArrowBack
      className="arrow"
      size="30"
      color={page > 1 ? 'white' : 'darkgray'}
      onClick={page > 1 ? onArrowClick(page - 1) : null}
    />
    <div className="page-number">{page}</div>
    <IoIosArrowForward
      className="arrow"
      size="30"
      color={page === total ? 'darkgray' : 'white'}
      onClick={page < total ? onArrowClick(page + 1) : null}
    />
  </div>
);

export default Pagination;
