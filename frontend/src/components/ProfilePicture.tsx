import React from 'react';

interface ProfilePictureProps {
  onClick: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onClick }) => {
  return (
    <img 
      src="assets/Saideep.jpg"
      alt="My Profile" 
      onClick={onClick}
      style={{ cursor: 'pointer', width: '200px', height: '200px' }}
    />
  );
}

export default ProfilePicture;
