import React from 'react';
import { MobileInterface, SuggestionInterface } from '../../types/number.interface';
import Pagination from '../Pagination';
import TableRow from '../TableRow';
import './Table.css';

interface Props {
  data: Record<string, MobileInterface>;
  onArrowClick: Function;
  page: number;
  total: number;
  updateNumber: (id: string, suggestion: SuggestionInterface) => Promise<void>;
}

export const Table = ({ data, onArrowClick, page, total, updateNumber }: Props) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Original</th>
          <th>Changed</th>
          <th>Valid</th>
          <th>Suggestions</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map(
          (key: string): JSX.Element => {
            const item: MobileInterface = data[key];
            return <TableRow key={item.id} item={item} updateNumber={updateNumber} />;
          },
        )}
      </tbody>
    </table>
    <Pagination onArrowClick={onArrowClick} page={page} total={total} />
  </div>
);

export default Table;
