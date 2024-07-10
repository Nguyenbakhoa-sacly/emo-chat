import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
export default function SearchUserCard({ user }) {
  return (
    <>
      <div className='hover:bg-slate-100 text-slate-50 hover:text-slate-800 transition-all'>
        <Link to={`/${user?._id}`}>
          <div className='flex items-center p-2'>
            <Avatar src={user.profile_pic} className='w-10 h-10' />
            <div className='pl-2 '>
              <p className='font-semibold text-slate-600'>{user.name}</p>
              <p className='text-slate-400'>{user.email}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
