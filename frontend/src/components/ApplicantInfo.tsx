import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectApplicant, updateApplicantThunk } from '../redux/applicantSlice';
import { Applicant } from '../services/api';
import { AppDispatch } from '../redux/store';

const ApplicantInfo: React.FC = () => {
  const applicant = useSelector(selectApplicant);
  const dispatch: AppDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Applicant | null>(null);

  useEffect(() => {
    setFormData(applicant);
  }, [applicant]);

  if (!applicant) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDoneClick = () => {
    if (formData) {
      dispatch(updateApplicantThunk(formData));
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="Applicant-info">
      {isEditing ? (
        <>
          <input name="name" value={formData?.name} onChange={handleChange} data-testid="name-input" />
          <input name="role" value={formData?.role} onChange={handleChange} data-testid="role-input" />
          <input name="location" value={formData?.location} onChange={handleChange} data-testid="location-input" />
          <input name="hobbies" value={formData?.hobbies.join(', ')} onChange={handleChange} data-testid="hobbies-input" />
          <button onClick={handleDoneClick} data-testid="done-button">Done</button>
        </>
      ) : (
        <>
          <h2>{applicant.name}</h2>
          <p>Role: {applicant.role}</p>
          <p>Location: {applicant.location}</p>
          <p>Hobbies: {applicant.hobbies.join(', ')}</p>
          <button onClick={handleEditClick} data-testid="edit-button">Edit</button>
        </>
      )}
    </div>
  );
};

export default ApplicantInfo;
