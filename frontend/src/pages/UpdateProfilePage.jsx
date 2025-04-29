import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './updateProfile.css';
import Compressor from 'compressorjs';

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    description: '',
    profilePic: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: response.data.user.name || '',
          bio: response.data.user.bio || '',
          description: response.data.user.description || '',
          profilePic: response.data.user.profilePic || '',
        });
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size exceeds 5MB.');
        return;
      }

      new Compressor(file, {
        quality: 0.7,
        maxWidth: 1200,
        maxHeight: 1200,
        success(compressedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prev) => ({
              ...prev,
              profilePic: reader.result,
            }));
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          toast.error('Failed to process image');
        },
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {};
      if (formData.name) payload.name = formData.name;
      if (formData.bio) payload.bio = formData.bio;
      if (formData.description) payload.description = formData.description;
      if (formData.profilePic && formData.profilePic.startsWith('data:image/')) {
        payload.profilePic = formData.profilePic;
      }

      const response = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        name: response.data.user?.name || prev.name,
        bio: response.data.user?.bio || prev.bio,
        description: response.data.user?.description || prev.description,
        profilePic: response.data.user?.profilePic || prev.profilePic,
      }));

      toast.success('Profile updated successfully!');
      setIsEdit(false);
    } catch (error) {
      if (error.response?.status === 413) {
        toast.error('Payload too large. Please select a smaller image.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
    <div className="update-profile-page">
  <h2 className="update-profile-title">Profile Details</h2>

  {loading ? (
    <p className="update-profile-loading">Loading...</p>
  ) : (
    <div>
      <form className={`update-profile-form ${loading ? 'loading' : ''}`}>
        <input
          className="update-profile-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          disabled={!isEdit}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        />
        <textarea
          className="update-profile-textarea"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          rows="3"
          disabled={!isEdit}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        ></textarea>
        <textarea
          className="update-profile-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="5"
          disabled={!isEdit}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        ></textarea>

        {isEdit ? (
          <input
            className="update-profile-file"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        ) : (
          <>
            {formData.profilePic && (
              <img
                className="update-profile-image"
                src={formData.profilePic}
                alt="Profile"
              />
            )}
          </>
        )}

        {!isEdit ? (
          <button
            type="button"
            className="update-profile-edit-btn"
            onClick={handleEdit}
            disabled={loading}
          >
            Edit Profile
          </button>
        ) : (
          <button
            type="button"
            className="update-profile-save-btn"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        )}
      </form>
    </div>
  )}
</div>

    </>
  );
};

export default UpdateProfilePage;
