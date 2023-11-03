import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import { logout, getUser } from "../../utils/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
      setUser({});
      logout(() => navigate("/"));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logoutHandler = () => {
    logoutUser();
    toast.success("Logged out", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  // Assuming you have a getUser function for retrieving user data
  // Update the user state with the user data
  const fetchUser = () => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          useKape
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Search />
        {user.name ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.avatar && user.avatar.url}
                  alt={user.name}
                  className="rounded-circle"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/me">
                  <a className="justify-between">Profile</a>
                </Link>
              </li>
              <li>
                <Link to="/orders/me">
                  <a>
                    Orders
                    <span className="badge">New</span>
                  </a>
                </Link>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
