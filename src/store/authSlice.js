import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  userData: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.userData = null
      // Clear localStorage when logging out
      localStorage.removeItem('aqqUserInfo')
    }
  }
})

export const { setUserData, logout } = authSlice.actions
export default authSlice.reducer
