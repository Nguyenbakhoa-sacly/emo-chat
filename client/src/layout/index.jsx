

import React from 'react'

export default function index({ children }) {
  return (
    <>
      <header className='w-full bg-transparent shadow-md p-4 md:px-16'>
        <div className='text-2xl font-bold'>
          EMO CHAT
        </div>
      </header>
      {children}
    </>
  )
}
