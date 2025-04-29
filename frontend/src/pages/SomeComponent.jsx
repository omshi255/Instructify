// /src/components/SomeComponent.jsx
import { useNavigate } from 'react-router-dom';

const SomeComponent = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/update-profile');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handleEditProfile}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default SomeComponent;
