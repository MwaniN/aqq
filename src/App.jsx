import './App.css'
import { useState, useEffect} from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router'
import { signOut } from 'firebase/auth';
import { auth } from './auth/firebase.js';
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import LogIn from './auth/LogIn.jsx'
import SignUp from './auth/SignUp.jsx'
import ProfilePage from './ProfilePage.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth, logout } from './store/authSlice';
import { loadQuizFromStorage } from './store/quizSlice';
import { store } from './store/store';
import { getRedirectResult } from 'firebase/auth';
import axios from 'axios';
import { setUserData } from './store/authSlice';

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);
  const [quizLength, setQuizLength] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { isAuthenticated, userData, isLoading, authInitialized } = useSelector(state => state.auth);
  

  useEffect(() => {
    // Initialize Firebase auth check using Redux (only once on app startup)
    if (!authInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, authInitialized]);

  // Load quiz state from localStorage on app startup
  useEffect(() => {
    const quizLengths = ['5', '10', '15'];
    
    quizLengths.forEach(quizLength => {
      const savedQuizState = localStorage.getItem(`aqqQuizState_${quizLength}`);
      if (savedQuizState) {
        try {
          const parsedState = JSON.parse(savedQuizState);
          dispatch(loadQuizFromStorage({ quizLength, savedState: parsedState }));
        } catch (error) {
          console.log(`Error loading quiz state for ${quizLength} questions:`, error);
          localStorage.removeItem(`aqqQuizState_${quizLength}`);
        }
      }
    });
  }, [dispatch]);

  // Handle Google sign-in redirect result - Firebase official pattern
  useEffect(() => {
    console.log('App: Redirect useEffect running - checking dependencies:', { dispatch, navigate });
    
    // Display stored Google sign-in logs for debugging
    const storedLogs = localStorage.getItem('googleSignInLogs');
    if (storedLogs) {
      console.log('=== STORED GOOGLE SIGN-IN LOGS ===');
      const logs = JSON.parse(storedLogs);
      console.log(`Total logs: ${logs.length}`);
      logs.forEach((log, index) => {
        console.log(`[${index}] [${log.timestamp}] ${log.message}`, log.data);
      });
      console.log('=== END STORED LOGS ===');
      
      // Clear old logs to avoid confusion
      localStorage.removeItem('googleSignInLogs');
    }
    
    const handleRedirectResult = async () => {
      try {
        // Check if we're coming from a redirect by looking at the URL
        const urlParams = new URLSearchParams(window.location.search);
        const hasRedirectParams = urlParams.has('code') || urlParams.has('state') || urlParams.has('error');
        console.log('App: URL params:', Object.fromEntries(urlParams.entries()));
        console.log('App: Has redirect params?', hasRedirectParams);
        console.log('App: Current URL:', window.location.href);
        
        // Add a small delay to ensure redirect is fully processed
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('App: Checking for redirect result...');
        console.log('App: Firebase auth instance:', auth);
        console.log('App: Auth current user:', auth.currentUser);
        console.log('App: Auth is ready?', auth.app);
        
        const result = await getRedirectResult(auth);
        console.log('App: Redirect result:', result);
        
        if (result) {
          console.log('App: User signed in via redirect, processing...');
          const idToken = await result.user.getIdToken();
          console.log('App: Got ID token, calling backend...');
          
          // Call backend to get user data
          const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });
          
          console.log('App: Backend response:', response.data);
          const userData = { ...response.data, token: idToken };
          
          // Save to localStorage
          localStorage.setItem('aqqUserInfo', JSON.stringify(userData));
          
          // Dispatch to update Redux state
          dispatch(setUserData(userData));
          
          // Handle navigation after successful redirect login
          const returnLocation = localStorage.getItem('returnAfterLogin');
          if (returnLocation) {
            try {
              const location = JSON.parse(returnLocation);
              localStorage.removeItem('returnAfterLogin');
              
              // Check if the stored location is not too old (24 hours)
              const isExpired = Date.now() - location.timestamp > 24 * 60 * 60 * 1000;
              if (!isExpired) {
                navigate(location.path + location.search);
              } else {
                navigate('/');
              }
            } catch (error) {
              console.log('App: Error parsing return location:', error);
              localStorage.removeItem('returnAfterLogin');
              navigate('/');
            }
          } else {
            navigate('/');
          }
        } else {
          console.log('App: No redirect result found');
        }
      } catch (error) {
        console.error('App: Error processing redirect result:', error);
      }
    };

    // Call immediately on app load - Firebase official pattern
    handleRedirectResult();
  }, [dispatch, navigate]);

  // Utility function to handle return-to-location after login
  const handleReturnAfterLogin = () => {
    const returnLocation = localStorage.getItem('returnAfterLogin');
    if (returnLocation) {
      try {
        const location = JSON.parse(returnLocation);
        localStorage.removeItem('returnAfterLogin');
        
        // Check if the stored location is not too old (24 hours)
        const isExpired = Date.now() - location.timestamp > 24 * 60 * 60 * 1000;
        if (!isExpired) {
          navigate(location.path + location.search);
          return true;
        }
      } catch (error) {
        console.log('Error parsing return location:', error);
        localStorage.removeItem('returnAfterLogin');
      }
    }
    return false;
  };

  function handleLogout() {
    signOut(auth).then(() => {
      // Dispatch Redux logout action
      dispatch(logout());
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error)
    })
  }

  function handleSignInClick() {
    // Get current Redux state
    const currentState = store.getState();
    
    // Capture current location and app state before navigating to login
    const returnLocation = {
      path: window.location.pathname,
      search: window.location.search,
      timestamp: Date.now(),
      appState: {
        quiz: currentState.quiz,
        auth: {
          isAuthenticated: currentState.auth.isAuthenticated,
          userData: currentState.auth.userData
        }
      }
    };
    localStorage.setItem('returnAfterLogin', JSON.stringify(returnLocation));
    
    // Navigate to login page
    navigate('/login');
  }


  return (
    <>
      <header id="header">
      <span><Link to="/"><button type="button">Home</button></Link></span>
        <div id="title">
        Anime Quote Quiz
        </div>
        <ul>
        {
          function (){
            if (isAuthenticated && userData) {
              return <ul>
                <li><Link to="/profile"><button type="button">Profile</button></Link></li>
                <li><button type="button" onClick={() => handleLogout()}>Sign out</button></li>
              </ul>
            } else {
              return <ul>
                <li><button type="button" onClick={handleSignInClick}>Sign In</button></li>
                <li><Link to="/signup"><button type="button">Sign Up</button></Link></li>
              </ul>
            }
          }()
        }
        </ul>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} setQuizLength={setQuizLength} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} quizLength={quizLength} setQuoteNum={setQuoteNum} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
