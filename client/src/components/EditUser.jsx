
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useRef } from 'react';
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import uploadFile from '../utils/uploadFile';
import { toast } from 'react-toastify';
import { setUser } from '../redux/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function EditUser({ openEditUser, handleCloseEditUser }) {
  const pic_file = useRef();
  const { currentUser } = useSelector(state => state?.user)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    console.log(uploadPhoto)
    setImageFile(file);
    setFormData({ ...formData, profile_pic: uploadPhoto?.url });
  };
  const handleClearUploadFile = (e) => {
    e.preventDefault();
    setImageFile(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/v1/user/updateuser/${currentUser._id}`,
        {
          body: JSON.stringify(formData),
          credentials: 'include',
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
        dispatch(setUser(data))
        handleCloseEditUser();
      }
    } catch (e) {
      console.log(e);
      toast.error(data?.message);
    }
  }
  return (
    <>
      <div>
        <Modal
          open={openEditUser}
          onClose={handleCloseEditUser}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Profile Details
            </Typography>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mx-auto max-w-lg ">
                <div className='flex justify-center'>
                  <Avatar
                    alt="Remy Sharp"
                    src={formData?.profile_pic}
                    sx={{ width: 80, height: 80 }}
                  />
                </div>
                <div className="py-1">
                  <span className="px-1 text-sm text-gray-600">Username</span>
                  <input
                    placeholder=""
                    type="name"
                    id="name"
                    defaultValue={currentUser.name}
                    onChange={handleChange}
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
                <button
                  type='submmit'
                  className="mt-3 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                  Update User
                </button>
              </div>
            </form>

            {/* <Button onClick={handleCloseEditUser}>Close</Button> */}
          </Box>
        </Modal>
      </div>
    </>
  )
}
