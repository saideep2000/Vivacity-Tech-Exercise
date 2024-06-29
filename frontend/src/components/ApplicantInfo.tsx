import React from 'react';

interface ApplicantInfoProps {
  id: number;
  name: string;
  role: string;
  location: string;
  hobbies: string[];
}

const ApplicantInfo: React.FC<ApplicantInfoProps> = ({ id, name, role, location, hobbies }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Location: {location}</p>
      <p>Hobbies: {hobbies.join(', ')}</p>
    </div>
  );
}

export default ApplicantInfo;
