import React, { useEffect } from 'react';
import './App.css';
import ProfilePicture from './components/ProfilePicture';
import ApplicantInfo from './components/ApplicantInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicantByName } from './services/api';
import { setApplicant, toggleVisibility, selectVisibility } from './redux/applicantSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectVisibility);

  const handleClick = async () => {
    dispatch(toggleVisibility());
    if (!isVisible) {
      try {
        const applicantData = await getApplicantByName("Saideep Samineni");
        dispatch(setApplicant(applicantData));
      } catch (err) {
        console.error('Failed to fetch applicant information', err);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Profile</h1>
        <ProfilePicture onClick={handleClick} />
        {isVisible && <ApplicantInfo />}
      </header>
    </div>
  );
};

export default App;
