
import { useEffect, useState } from "react";
import { MdOutlineSearch, MdClear } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import UserItem from "./UserItem";
import { toast } from "react-toastify";
import SearchUserCard from "./SearchUserCard";
function Search() {
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/v1/user/search-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: valueSearch }),
      })
      setIsLoading(false);
      const data = await response.json();
      setSearchUser(data.data);
    } catch (e) {
      toast.error(data.message);
    }
  }
  useEffect(() => {
    handleSearchUser();
  }, [valueSearch])
  return (
    <>
      <div className='w-full h-[58px] flex items-center border-b-[1px] border-b-slate-500 '>

        <div className="w-full flex items-center text-slate-50 bg-transparent border-[1px] border-slate-500 rounded-lg ">
          <input
            type="text"
            value={valueSearch}
            onFocus={() => setOpenSearchUser(true)}
            // onBlur={() => setOpenSearchUser(false)}
            onChange={(e) => setValueSearch(e.target.value)}
            className=' px-4 py-2 rounded-md bg-transparent focus:outline-none'
            placeholder='Search...'
          />
          {
            valueSearch.length > 0 ? (
              <MdClear
                className='text-xl text-slate-500 cursor-pointer hover:text-slate-50 mr-3'
                onClick={() => setValueSearch('')} />
            ) : (
              <MdOutlineSearch className='text-xl text-slate-500 cursor-pointer hover:text-slate-50 mr-3' />
            )
          }
        </div>
      </div>
      {/* search nguoi dung */}
      {
        openSearchUser &&
        <div className="w-[251px] h-[200px] bg-white fixed top-[58px] shadow-md rounded-md">
          <div className="flex justify-end p-2">
            <MdClear
              className='text-xl text-slate-500 cursor-pointer hover:text-slate-800'
              onClick={() => setOpenSearchUser(!openSearchUser)} />
          </div>
          {
            searchUser?.length === 0 && !isLoading && (
              <div className="p-4 text-slate-500 text-center">No user found.</div>
            )
          }
          {
            isLoading && (
              <Box sx={{
                height: '100%',
                width: '100%',
                borderRadius: '5px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                display: 'flex', justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress size={30} />
              </Box>
            )

          }
          {/* Search Results */}
          {
            searchUser?.length !== 0 && !isLoading && (
              searchUser?.map((user, index) => (
                <SearchUserCard key={index} user={user} />
              ))
            )
          }
        </div>
      }
    </>
  )
}

export default Search