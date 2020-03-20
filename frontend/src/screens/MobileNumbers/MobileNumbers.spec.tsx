import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import MobileNumbers from '.';
import services from '../../common/services/numbers.service';

const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (!args[0].includes('Warning: ')) {
      consoleError(...args);
    }
  });
});

const mockNumber = {
  id: '213123',
  isValid: true,
  number: 213123,
  originalNumber: 213123,
  changed: 'first-two',
  suggestions: [{ number: 213123, changed: 'first-two-fourth' }],
};
const mockNumbers = {
  page: 1,
  total: 10,
  data: {
    '213123': mockNumber,
  },
};

const getNumbers = jest.fn();
const uploadFile = jest.fn();
services.getNumbers = getNumbers;
services.uploadFile = uploadFile;

describe('MobileNumbers Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able get numbers and render', async () => {
    getNumbers.mockResolvedValue({ success: true, data: mockNumbers });
    const { getByTestId } = render(<MobileNumbers />);
    expect(getNumbers).toHaveBeenCalled();
    const row = await waitForElement(() => getByTestId('mobile-number-row'));
    expect(row).toBeTruthy();
  });

  it('should be able to upload file', async () => {
    getNumbers.mockResolvedValue({ success: true, data: {} });
    uploadFile.mockResolvedValue({ success: true, data: mockNumbers });
    const { getByTestId } = render(<MobileNumbers />);
    const fileInput = getByTestId('file');
    const submitButton = getByTestId('submit-button');
    expect(fileInput).toBeTruthy();
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['(⌐□_□)'], 'numbers.csv', { type: 'text/csv' })],
      },
    });
    fireEvent.click(submitButton);
    expect(uploadFile).toHaveBeenCalled();
    const row = await waitForElement(() => getByTestId('mobile-number-row'));
    expect(row).toBeTruthy();
  });

  it('should render message if no file has been selected on submit', async () => {
    getNumbers.mockResolvedValue({ success: true, data: {} });
    const { getByTestId } = render(<MobileNumbers />);
    const submitButton = getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(uploadFile).toHaveBeenCalledTimes(0);
    const errorMessage = await waitForElement(() => getByTestId('error-message'));
    expect(errorMessage).toBeTruthy();
  });
});
