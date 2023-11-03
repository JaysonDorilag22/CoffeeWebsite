import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader';
import Metadata from '../Layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { authenticate } from '../../utils/helpers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true); // Set loading to true when starting the login request
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config);
      console.log(data);
      authenticate(data, () => {
        setLoading(false); // Set loading back to false after successful login
        navigate('/');
      });
    } catch (error) {
      toast.error('Invalid user or password', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setLoading(false); // Set loading back to false if there's an error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={'Login'} />
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={submitHandler}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="label">
                      <Link to="/password/forgot" className="label-text-alt link link-hover">
                        Forgot password?
                      </Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      LOGIN
                    </button>
                  </div>
                  <div className="label text-center">
                    <span className="label-text-alt">
                      Don't you have an account?&nbsp;
                      <Link className="link link-hover " to="/register">
                        Register
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
