import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getToken, getUser } from '../../utils/helpers';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const updatePassword = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      };

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/update`, formData, config);
      setIsUpdated(data.success);
      setLoading(false);
      toast.success('Password updated', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      navigate('/me');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      oldPassword,
      password
    };

    updatePassword(formData);
  };

  return (
    <Fragment>
      <MetaData title={'Change Password'} />

      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl mt-2 mb-5">Update Password</h1>
          <div className="mb-4">
            <label htmlFor="old_password_field" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="new_password_field" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-2"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
