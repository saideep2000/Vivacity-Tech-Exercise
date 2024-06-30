import applicantReducer, { setApplicant, toggleVisibility, ApplicantState, updateApplicantThunk } from './applicantSlice';
import { Applicant } from '../services/api';

describe('applicant reducer', () => {
  const initialState: ApplicantState = {
    applicant: null,
    isVisible: false,
  };

  it('should handle initial state', () => {
    expect(applicantReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleVisibility', () => {
    const actual = applicantReducer(initialState, toggleVisibility());
    expect(actual.isVisible).toEqual(true);
    const actual2 = applicantReducer(actual, toggleVisibility());
    expect(actual2.isVisible).toEqual(false);
  });

  it('should handle setApplicant', () => {
    const applicant: Applicant = { id: 1, name: 'Saideep Samineni', role: 'Developer', location: 'NY', hobbies: ['Coding'] };
    const actual = applicantReducer(initialState, setApplicant(applicant));
    expect(actual.applicant).toEqual(applicant);
  });

  it('should handle updateApplicantThunk.fulfilled', async () => {
    const applicant: Applicant = { id: 1, name: 'Saideep Samineni', role: 'Developer', location: 'NY', hobbies: ['Coding'] };
    const editedApplicant: Applicant = { id: 1, name: 'Edited Name', role: 'Developer', location: 'NY', hobbies: ['Coding'] };
    const action = { type: updateApplicantThunk.fulfilled.type, payload: editedApplicant };
    const actual = applicantReducer({ applicant, isVisible: true }, action);
    expect(actual.applicant).toEqual(editedApplicant);
  });
});
