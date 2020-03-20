import React, { useEffect, useState } from 'react';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';
import { MobileInterface, SuggestionInterface } from '../../types/number.interface';
import Button from '../Button';
import './TableRow.css';

interface SuggestionState extends SuggestionInterface {
  loading: boolean;
}

interface Props {
  item: MobileInterface;
  updateNumber: (id: string, suggestion: SuggestionInterface) => Promise<void>;
}

export const TableRow = ({
  item: { id, changed, isValid, number, originalNumber, suggestions: propSuggestions },
  updateNumber,
}: Props): JSX.Element => {
  const [suggestions, setSuggestions] = useState<SuggestionState[]>([]);

  useEffect(() => {
    if (propSuggestions && propSuggestions.length) {
      setSuggestions(propSuggestions.map(item => ({ ...item, loading: false })));
    }
  }, [propSuggestions]);

  const onSelectClick = (suggestion: SuggestionInterface, index: number) => async (): Promise<void> => {
    const allSuggestions = [...suggestions];
    const newSuggestions = [...allSuggestions];
    newSuggestions[index] = {
      ...suggestions[index],
      loading: true,
    };
    setSuggestions(newSuggestions);
    await updateNumber(id, suggestion);
    setSuggestions(allSuggestions);
  };

  const renderChangedNumber = (value: string, type: string): JSX.Element | string => {
    switch (type) {
      case 'first-two':
        return (
          <>
            <span className="number__suggestion number__suggestion--red">{value.substring(0, 2)}</span>
            <span className="number__suggestion">{value.substring(2)}</span>
          </>
        );
      case 'first-two-fourth':
        return (
          <>
            <span className="number__suggestion number__suggestion--red">{value.substring(0, 2)}</span>
            <span className="number__suggestion">{value.substring(2, 3)}</span>
            <span className="number__suggestion number__suggestion--red">{value.substring(3, 4)}</span>
            <span className="number__suggestion">{value.substring(4)}</span>
          </>
        );
      default:
        return value;
    }
  };

  return (
    <tr key={id} data-testid="mobile-number-row">
      <td>{id}</td>
      <td>{originalNumber}</td>
      <td>{number !== originalNumber && changed ? renderChangedNumber(`${number}`, changed) : number}</td>
      <td>{isValid ? <IoIosCheckmark color="green" size={24} /> : <IoIosClose color="red" size={24} />}</td>
      <td>
        {!isValid && suggestions && suggestions.length
          ? suggestions.map((item: SuggestionState, index: number) => (
              <div key={`${number}-${index}`}>
                {renderChangedNumber(`${item.number}`, item.changed)}
                <Button label="Select" loading={item.loading} onClick={onSelectClick(item, index)} type="save" />
              </div>
            ))
          : '-'}
      </td>
    </tr>
  );
};
export default TableRow;
