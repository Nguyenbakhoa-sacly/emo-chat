import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.currentUser = null
      state.token = ''
    }
  }
});

export const { setUser, setToken, logout } = userSlice.actions
export default userSlice.reducer