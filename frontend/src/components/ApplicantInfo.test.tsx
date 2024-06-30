import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import applicantReducer, { ApplicantState, setApplicant } from '../redux/applicantSlice';
import ApplicantInfo from './ApplicantInfo';
import { Applicant } from '../services/api';
import '@testing-library/jest-dom';

interface RenderOptions {
  initialState?: { applicant: ApplicantState };
  store?: EnhancedStore<{ applicant: ApplicantState }>;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: { applicant: applicantReducer },
      preloadedState: initialState,
    }),
  }: RenderOptions = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ApplicantInfo', () => {
  const applicant: Applicant = {
    id: 1,
    name: 'Saideep Samineni',
    role: 'Developer',
    location: 'NY',
    hobbies: ['Coding'],
  };

  test('renders applicant information and handles edit mode', async () => {
    const { asFragment } = renderWithProviders(<ApplicantInfo />, {
      initialState: { applicant: { applicant, isVisible: true } }
    });

    expect(screen.getByText(/Saideep Samineni/i)).toBeInTheDocument();
    expect(screen.getByText(/Role: Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: NY/i)).toBeInTheDocument();
    expect(screen.getByText(/Hobbies: Coding/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('edit-button'));

    const nameInput = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'Edited Name' } });

    fireEvent.click(screen.getByTestId('done-button'));

    expect(await screen.findByText(/Edited Name/i)).toBeInTheDocument();

    // Create a snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
