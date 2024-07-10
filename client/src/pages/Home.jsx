

import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user)
  const location = useLocation();

  console.log("location: " + location);
  const baseUrl = location.pathname === '/'
  console.log("baseUrl: " + baseUrl);

  return (
    <>
      {
        isLoading ? (
          <>
            Loading...
          </>) :
          (
            <div className='grid grid-cols-[300px,1fr] bg-[#212121] h-screen max-h-screen'>
              <section className={`${!baseUrl && "hidden"} lg:block`}>
                <Sidebar />
              </section>

              <section className={`${baseUrl && "hidden"}`}>
                <Outlet />
              </section>

              <div className={` ${!baseUrl ? "hidden" : "lg:flex"} hidden justify-center flex-col items-center`}>
                <div>
                  <img src={logo} className='w-56' alt="" />
                </div>
                <p className='mt-5 text-slate-50'>Select user to send message</p>
              </div>
            </div >
          )
      }
    </>
  )
}
