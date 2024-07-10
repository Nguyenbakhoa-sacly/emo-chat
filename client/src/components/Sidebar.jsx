import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import EditUser from './EditUser';
import { useState } from 'react';
import logo from '../assets/logo.svg'
import Search from './Search';
import ListUser from './ListUser';

export default function Sidebar() {
  const { currentUser } = useSelector(state => state?.user)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleLogout = () => {

  }

  return (
    <>
      <div className='h-full flex w-full bg-transparent border-r-[1px] border-slate-600'>
        <div className='bg-slate-50 flex flex-col justify-between w-12 h-full rounded-tr-lg py-5 text-slate-500'>
          <div>
            <NavLink className='mb-5 flex justify-center items-center cursor-pointer rounded'>
              <img className='w-6 h-6' src={logo} title='Home' alt="home" />
            </NavLink>

            <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-300'}`}>
              <IoChatbubbleEllipses size={25} />
            </NavLink>
            <NavLink className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}>
              <FaUserPlus size={25} />
            </NavLink>
          </div>
          <div>
            <button
              onClick={handleOpen}
              className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}>
              <Avatar alt="Remy Sharp" src={currentUser?.profile_pic} />
            </button>
            <button
              onClick={handleLogout}
              title='Logout'
              className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `}>
              <BiLogOut size={25} />
            </button>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          {/* Search */}
          <Search />
          {/* List user  */}
          <ListUser />
        </div>
      </div >
      <EditUser
        data={currentUser}
        openEditUser={open}
        handleCloseEditUser={handleClose} />
    </>
  )
}
