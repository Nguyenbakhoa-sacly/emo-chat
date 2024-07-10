
import { Avatar } from '@mui/material'

export default function UserItem() {
  return (
    <>
      <div className=' hover:bg-slate-100 text-slate-50 hover:text-slate-800 transition-all'>
        <div className='flex items-center p-2'>
          <Avatar className='w-10 h-10' />
          <div className='pl-2 text-slate-500'>
            <p className='font-semibold'></p>
          </div>
        </div>
      </div>
    </>
  )
}
