import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Metadata from '../Layout/MetaData';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Changed to false

    let navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            console.log(error);
            setError('');
        }
    }, [error, isAuthenticated]);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading to true when the button is clicked

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/register`,
                formData,
                config
            );
            console.log('Registration successful:', data.user);
            setIsAuthenticated(true);
            setUser(data.user);
            setLoading(false); // Set loading to false on successful registration
            navigate('/login');
        } catch (error) {
            console.log('Registration error:', error);
            setIsAuthenticated(false);
            setUser(null);
            setError(error);
            setLoading(false); // Set loading to false on error
        }
    };

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Please select a valid image file.');
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <Fragment>
            <Metadata title={'Register User'} />
            <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md bg-white p-8 shadow-md rounded-lg">
                    <h1 className="text-2xl mb-4">Register</h1>

                    <div className="mb-4">
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name_field"
                            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password_field" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password_field"
                            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-700">
                            Avatar
                        </label>
                        <div className="flex items-center">
                            <div>
                                <figure className="avatar mr-3">
                                    <img src={avatarPreview} className="rounded-full" alt="Avatar Preview" />
                                </figure>
                            </div>
                            <div className="custom-file">
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
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg py-2"
                        onClick={submitHandler}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'REGISTER'}
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
