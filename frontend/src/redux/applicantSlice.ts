import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Applicant, updateApplicant } from '../services/api';
import { RootState } from './store';

interface ApplicantState {
  applicant: Applicant | null;
  isVisible: boolean;
}

const initialState: ApplicantState = {
  applicant: null,
  isVisible: false,
};

export const updateApplicantThunk = createAsyncThunk(
  'applicant/updateApplicant',
  async (applicant: Applicant) => {
    const updatedApplicant = await updateApplicant(applicant);
    return updatedApplicant;
  }
);

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    setApplicant: (state, action: PayloadAction<Applicant>) => {
      state.applicant = action.payload;
    },
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateApplicantThunk.fulfilled, (state, action: PayloadAction<Applicant>) => {
      state.applicant = action.payload;
    });
  }
});

export const { setApplicant, toggleVisibility } = applicantSlice.actions;

export const selectApplicant = (state: RootState) => state.applicant.applicant;
export const selectVisibility = (state: RootState) => state.applicant.isVisible;

export default applicantSlice.reducer;
export type { ApplicantState };
