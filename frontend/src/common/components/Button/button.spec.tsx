import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

const defaultProps = {
  on: jest.fn(),
  label: 'Label',
  loading: false,
  onClick: jest.fn(),
  type: 'save',
};

const setup = (props = {}) => <Button {...defaultProps} {...props} />;

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to click on button', () => {
    const { getByTestId } = render(setup());
    fireEvent.click(getByTestId('button'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render loading label if prop loading', () => {
    const { getByTestId } = render(setup({ loading: true }));
    expect(getByTestId('button-loading')).toBeTruthy();
  });
});
