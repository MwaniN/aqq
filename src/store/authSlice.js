import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../auth/firebase.js'

// Async thunk for Firebase authentication initialization
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in - get token and sync with localStorage
          user.getIdToken().then((idToken) => {
            const userData = {
              uid: user.uid,
              email: user.email,
              token: idToken
            }
            // Update localStorage for persistence
            localStorage.setItem('aqqUserInfo', JSON.stringify(userData))
            resolve(userData)
          })
        } else {
          // User is not logged in - clear localStorage
          localStorage.removeItem('aqqUserInfo')
          resolve(null)
        }
      })
    })
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        // Firebase auth check is in progress
        state.isLoading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        // Firebase auth check completed
        state.user = action.payload
        state.isAuthenticated = !!action.payload
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(initializeAuth.rejected, (state) => {
        // Firebase auth check failed (network error, etc.)
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.userData = null
      })
  }
})

export const { setUserData, logout } = authSlice.actions
export default authSlice.reducer
