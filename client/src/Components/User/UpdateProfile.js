import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../Layout/MetaData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  let navigate = useNavigate();

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, config);
      setUser(data.user);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Invalid user or password', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const updateProfile = async (userData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.put('/api/v1/me/update', userData, config);
      setIsUpdated(true);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    getProfile();

    if (isUpdated) {
      toast.success('User updated successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/me', { replace: true });
    }
  }, [isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);

    updateProfile(formData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={'Update Profile'} />

      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-5">Update Profile</h1>

          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="name_field" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="w-full py-2 px-3 rounded border border-gray-300"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email_field" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="w-full py-2 px-3 rounded border border-gray-300"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="avatar_upload" className="block text-gray-700 text-sm font-bold mb-2">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                className="custom-file-input"
                id="customFile"
                accept="image/*"
                onChange={onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Avatar
              </label>
              <div className="mt-2">
                <img
                  src={avatarPreview}
                  className="rounded-circle w-16 h-16"
                  alt="Avatar Preview"
                />
              </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
