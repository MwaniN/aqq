import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../auth/firebase.js'

// Async thunk for Firebase authentication initialization
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe() // Unsubscribe immediately to prevent multiple calls
        
        if (user) {
          // User is logged in - get token and check localStorage for full user data
          user.getIdToken().then((idToken) => {
            // Check if we have full user data in localStorage
            const savedUserData = localStorage.getItem('aqqUserInfo')
            if (savedUserData) {
              const parsedData = JSON.parse(savedUserData)
              // Update token in case it changed
              parsedData.token = idToken
              localStorage.setItem('aqqUserInfo', JSON.stringify(parsedData))
              resolve(parsedData)
            } else {
              // No saved data, create basic userData (will be updated when user logs in)
              const userData = {
                uid: user.uid,
                email: user.email,
                token: idToken
              }
              resolve(userData)
            }
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
  userData: null,
  authInitialized: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
      state.isAuthenticated = !!action.payload
      state.user = action.payload
      state.authInitialized = true // Mark as initialized when user data is set
      
      // Save to localStorage for persistence
      if (action.payload) {
        localStorage.setItem('aqqUserInfo', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('aqqUserInfo')
      }
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
        state.authInitialized = true
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
