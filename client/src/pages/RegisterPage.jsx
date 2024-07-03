

import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import uploadFile from '../utils/uploadFile'
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RegisterPage() {
  const pic_file = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setImageFile(file);
    setFormData({ ...formData, profile_pic: uploadPhoto?.url });
  };
  const handleClearUploadFile = (e) => {
    e.preventDefault();
    setImageFile(null);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate('/login');
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
                      <span className="px-1 text-sm text-gray-600">Username</span>
                      <input
                        placeholder=""
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                    </div>
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
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Avatar</span>
                      <input
                        name="profile_pic"
                        onChange={handleImageChange}
                        accept='image/*'
                        type="file"
                        hidden
                        ref={pic_file}
                      />
                      <div className="cursor-pointer flex justify-between text-sm text-slate-500 px-3 py-3 rounded-lg w-full bg-white border-2 border-gray-300 shadow-md  ">
                        <p className='flex-1'
                          onClick={() => pic_file.current.click()}
                        >
                          {imageFile ? imageFile?.name : 'Choose a file'}
                        </p>
                        {
                          imageFile?.name && (
                            <button
                              onClick={handleClearUploadFile}>
                              <MdClose size={20} />
                            </button>
                          )
                        }
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <label className=" text-gray-500 font-bold my-4 flex items-center">
                        <input className="leading-loose text-pink-600 top-0" type="checkbox" />
                        <span className="ml-2 text-sm py-2 text-gray-600 text-left">Accept the
                          <a href="#"
                            className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                            Terms and Conditions of the site
                          </a>and
                          <a href="#"
                            className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                            the information data policy.</a>
                        </span>
                      </label>
                    </div>
                    <button
                      type='submmit'
                      className="mt-3 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                      Register
                    </button>
                  </div>
                </form>

                <div className="text-sm font-semibold py-6 flex justify-center">
                  <Link to={'/login'}
                    className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500">
                    You're already member?
                    <span className="text-black font-semibold">
                      Login
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
