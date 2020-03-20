import React, { useEffect, useState, SyntheticEvent } from 'react';
import Table from '../../common/components/Table';
import './MobileNumbers.css';
import { SuggestionInterface } from '../../common/types/number.interface';
import services from '../../common/services/numbers.service';

export const SAMobileNumbers = (): JSX.Element => {
  const [file, setFile] = useState<any>(null);
  const [fileValue, setFileValue] = useState<any>('');
  const [message, setMessage] = useState<string>('');
  const [numbers, setNumbers] = useState<any>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getNumbers(page);
  }, [page]);

  const getNumbers = async (page: number): Promise<void> => {
    const { success, data } = await services.getNumbers(page);
    if (success) {
      setNumbers(data);
      setPage(page);
    }
  };

  const updateNumber = async (id: string, suggestion: SuggestionInterface): Promise<void> => {
    const { success, data, error } = await services.updateNumber(id, suggestion);
    if (success) {
      const newNumbers = { ...numbers };
      newNumbers.data[id] = data;
      setNumbers(newNumbers);
    } else {
      setErrorMessage(error);
    }
  };

  const handleForm = (event: any): void => {
    setFileValue(event.target.value);
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (file) {
      const { success, data, error } = await services.uploadFile(file);
      if (success) {
        setNumbers(data);
        setFile(null);
        setFileValue('');
        if (message) {
          setMessage('');
        }
      } else {
        setErrorMessage(error);
      }
    } else {
      setErrorMessage('You have to select file.');
    }
  };

  const setErrorMessage = (error: string | undefined = 'Something went wrong. Please try again'): void => {
    setMessage(error);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const onArrowClick = (newPage: number) => () => {
    getNumbers(newPage);
  };

  const renderForm = (): JSX.Element => (
    <form action="POST">
      <input data-testid="file" type="file" name="file" onChange={handleForm} value={fileValue} />
      <button data-testid="submit-button" type="submit" onClick={handleSubmit}>
        Upload File
      </button>
    </form>
  );

  return (
    <div className="container">
      {numbers && !Object.keys(numbers).length && renderForm()}
      {renderForm()}
      <div className="error-message" data-testid="error-message">
        {message}
      </div>
      {numbers && !!Object.keys(numbers).length && (
        <Table
          data={numbers.data}
          updateNumber={updateNumber}
          onArrowClick={onArrowClick}
          page={numbers.page}
          total={numbers.total}
        />
      )}
    </div>
  );
};

export default SAMobileNumbers;
