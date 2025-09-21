import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../auth/firebase.js'

// Global variable to store the auth unsubscribe function
let authUnsubscribe = null

// Async thunk for Firebase authentication initialization
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  (_, { getState, dispatch }) => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        const currentState = getState().auth
        
        if (!currentState.authInitialized) {
          // INITIAL AUTH CHECK - Only runs on app startup
          if (user) {
            const idToken = await user.getIdToken()
            const savedUserData = localStorage.getItem('aqqUserInfo')
            
            if (savedUserData) {
              const parsedData = JSON.parse(savedUserData)
              parsedData.token = idToken // Update token
              localStorage.setItem('aqqUserInfo', JSON.stringify(parsedData))
              resolve(parsedData) // Return full saved data
            } else {
              const userData = { uid: user.uid, email: user.email, token: idToken }
              resolve(userData) // Return basic Firebase data
            }
          } else {
            resolve(null) // Not logged in
          }
        } else if (user && currentState.authInitialized) {
          // TOKEN REFRESH - Only updates token, preserves user data
          const idToken = await user.getIdToken()
          const currentUserData = currentState.userData
          
          if (currentUserData) {
            const updatedData = { ...currentUserData, token: idToken }
            localStorage.setItem('aqqUserInfo', JSON.stringify(updatedData))
            dispatch(updateTokenOnly(idToken))
          }
        }
      })
      
      // Store unsubscribe function globally for cleanup
      authUnsubscribe = unsubscribe
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
    updateTokenOnly: (state, action) => {
      // Only update the token, preserve all other user data
      if (state.userData) {
        state.userData.token = action.payload
        state.user = { ...state.user, token: action.payload }
      }
    },
    logout: (state) => {
      // Clean up auth listener
      if (authUnsubscribe) {
        authUnsubscribe()
        authUnsubscribe = null
      }
      
      state.user = null
      state.isAuthenticated = false
      state.userData = null
      state.authInitialized = false
      
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

export const { setUserData, updateTokenOnly, logout } = authSlice.actions
export default authSlice.reducer
