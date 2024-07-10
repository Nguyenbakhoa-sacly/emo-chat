
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(setUser(data?.data));
        toast.success(data.message);
        navigate('/');
        setFormData({});
      }
    } catch (e) {
      console.log(e);
      toast.error(data.message);
    }
  }

  return (
    <>
      <div className="container max-w-full mx-auto md:py-20 px-6">
        <div className="max-w-sm mx-auto px-6">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <div className="md:mt-6">
                <form className="mt-8" onSubmit={handleSubmit}>
                  <div>
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-5">Welcome Back</p>
                  </div>
                  <div className="mx-auto max-w-lg ">
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Email</span>
                      <input placeholder="" type="email"
                        name="email"
                        onChange={handleChange}
                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                    </div>
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Password</span>
                      <input
                        name="password"
                        onChange={handleChange}
                        placeholder="" type="password"
                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                    </div>
                    <button
                      type='submmit'
                      className="mt-6 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-sm font-semibold py-6 flex justify-center">
                  <Link to={'/register'}
                    className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500">
                    You're not member?
                    <span className="text-black font-semibold">
                      Register
                    </span>
                  </Link>
                </div>
              </div >
            </div >
          </div >
        </div >
      </div >
    </>
  )
}
