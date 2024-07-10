
import React, { useState } from 'react'
import UserItem from './UserItem'

function ListUser() {
  const [allUser, setAllUser] = useState([]);

  return (
    <>
      <div className=' w-full h-[calc(100vh-58px)] overflow-x-hidden overflow-y-auto scrollbar'>
        {
          allUser?.length === 0 ? (
            <p className=' text-center mt-5 text-sm text-slate-50'>Explore users to start a conversation with.</p>

          ) : (
            <div className=''>
              {
                allUser?.map((user, index) => (
                  <UserItem key={index} user={user} />
                ))
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export default ListUser;