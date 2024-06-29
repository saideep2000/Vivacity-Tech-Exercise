import React, { useState } from 'react';
import './App.css';
import ProfilePicture from './components/ProfilePicture';
import ApplicantInfo from './components/ApplicantInfo';
import { getApplicantByName, Applicant } from './services/api';

const App: React.FC = () => {
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const applicantData = await getApplicantByName(encodeURIComponent("Saideep Samineni"));
      setApplicant(applicantData);
      setError(null);
    } catch (err) {
      console.error('Error fetching applicant information:', err);
      setError('Failed to fetch applicant information');
      setApplicant(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Profile</h1>
        <ProfilePicture onClick={handleClick} />
        {error && <p>{error}</p>}
        {applicant && (
          <ApplicantInfo 
            id={applicant.id}
            name={applicant.name}
            role={applicant.role}
            location={applicant.location}
            hobbies={applicant.hobbies}
          />
        )}
      </header>
    </div>
  );
}

export default App;
