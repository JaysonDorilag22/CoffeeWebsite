import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const getProfile = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, config);
      console.log(data);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Your Profile'} />

          <h2 className="my-4 text-2xl font-semibold mx-5">My Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-5">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="w-40 h-40 overflow-hidden rounded-full">
                <img src={user.avatar.url} alt={user.name} className="object-cover w-full h-full" />
              </div>
              <Link to="/me/update" id="edit_profile" className="btn btn-primary mt-4">
                Edit Profile
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="text-lg font-semibold">Full Name</div>
              <p>{user.name}</p>

              <div className="text-lg font-semibold">Email Address</div>
              <p>{user.email}</p>

              <div className="text-lg font-semibold">Joined On</div>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== 'admin' && (
                <Link to="/orders/me" className="btn btn-danger mt-5">
                  My Orders
                </Link>
              )}

              <Link to="/password/update" className="btn btn-primary mt-2">
                Change Password
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
