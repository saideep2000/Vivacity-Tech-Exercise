import axios from 'axios';

export interface Applicant {
  id: number;
  name: string;
  role: string;
  location: string;
  hobbies: string[];
}

export const getApplicantById = async (id: number): Promise<Applicant> => {
  const response = await axios.get<Applicant>(`http://localhost:4000/awesome/applicant/${id}`);
  return response.data;
}

export const getApplicantByName = async (name: string): Promise<Applicant> => {
  const encodedName = encodeURIComponent(name);
  const response = await axios.get<Applicant>(`http://localhost:4000/awesome/applicant/username/${encodedName}`);
  return response.data;
}

export const updateApplicant = async (applicant: Applicant): Promise<Applicant> => {
  const encodedName = encodeURIComponent(applicant.name);
  const response = await axios.put<Applicant>(`http://localhost:4000/awesome/applicant/username/${encodedName}`, applicant);
  return response.data;
}
