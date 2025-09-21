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

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { isAuthenticated, userData, isLoading, authInitialized } = useSelector(state => state.auth);
  

  useEffect(() => {
    // Initialize Firebase auth check using Redux (only once on app startup)
    if (!authInitialized) {
      dispatch(initializeAuth());
    } else {
    }
  }, [dispatch, authInitialized]);

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
                <li>User : {userData.email}</li>
                <li><button type="button" onClick={() => handleLogout()}>Sign out</button></li>
              </ul>
            } else {
              return <ul>
                <li><Link to="/login"><button type="button">Sign in</button></Link></li>
                <li><Link to="/signup"><button type="button">Sign up</button></Link></li>
              </ul>
            }
          }()
        }
        </ul>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} setQuoteNum={setQuoteNum} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
