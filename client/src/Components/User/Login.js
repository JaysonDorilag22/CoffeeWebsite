import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
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
  const navigate = useNavigate(); // Define navigate using useNavigate

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config);
      console.log(data);
      authenticate(data, () => navigate('/'));
    } catch (error) {
      toast.error('Invalid user or password', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

// import React, { Fragment, useState, useEffect } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'

// import Loader from '../Layout/Loader'
// import Metadata from '../Layout/MetaData'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import {authenticate} from '../../utils/helpers'

// const Login = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()
//     // let location = useLocation();
//     // const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''
//     // const notify = (error) => toast.error(error, {
//     //     position: toast.POSITION.BOTTOM_RIGHT
//     // });

//     const login = async (email, password) => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//             const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config)
//             console.log(data)
//             authenticate(data, () => navigate("/"))

//         } catch (error) {
//             toast.error("invalid user or password", {
//                 position: toast.POSITION.BOTTOM_RIGHT
//             })
//         }
//     }
//     const submitHandler = (e) => {
//         e.preventDefault();
//         login(email, password)
//     }

//     return (
//         <Fragment>
//             {loading ? <Loader /> : (
//                 <Fragment>
//                     <Metadata title={'Login'} />

//                     <div className="row wrapper">
//                         <div className="col-10 col-lg-5">
//                             <form className="shadow-lg"
//                                 onSubmit={submitHandler}
//                             >
//                                 <h1 className="mb-3">Login</h1>
//                                 <div className="form-group">
//                                     <label htmlFor="email_field">Email</label>
//                                     <input
//                                         type="email"
//                                         id="email_field"
//                                         className="form-control"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="form-group">
//                                     <label htmlFor="password_field">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password_field"
//                                         className="form-control"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>

//                                 <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

//                                 <button
//                                     id="login_button"
//                                     type="submit"
//                                     className="btn btn-block py-3"
//                                 >
//                                     LOGIN
//                                 </button>

//                                 <Link to="/register" className="float-right mt-3">New User?</Link>
//                             </form>
//                         </div>
//                     </div>


//                 </Fragment>
//             )}
//         </Fragment>
//     )
// }

// export default Login