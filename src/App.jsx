import './App.css'
import { useState, useEffect} from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router'
import { onAuthStateChanged, signOut, onIdTokenChanged } from 'firebase/auth';
import { auth } from './auth/firebase.js';
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import LogIn from './auth/LogIn.jsx'
import SignUp from './auth/SignUp.jsx'
import ProfilePage from './ProfilePage.jsx';
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from 'axios';
// clear local storage when the user logs out

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // initialize userInfo where an object can be saved to the userInfo key in localStorage
  const [userData, saveUserData] = useLocalStorage("aqqUserInfo", null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {

        setLoggedIn(true)
        // set profile name and email universally while logged in, can use state with an object and / or local storage
        console.log("user is logged in dude")
      } else {

        setLoggedIn(false)
        saveUserData(null)
        console.log("user is logged out")
      }
    })

    onIdTokenChanged(auth, (user) => {
      if (user) {
        // set the global header for axios calls if the token changes
        // this will keep the token current if the user's logged in for a long time since Firebase periodically changes the token of logged in users
        user.getIdToken().then((idToken) => {
            if (axios.defaults.headers.common['Authorization'].split(' ')[1] != idToken){
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken;
            }
        })
      }
    })

  }

  )

  function handleLogout() {

    signOut(auth).then(() => {
      // Sign out successful.
      navigate("/");
      console.log("Signed out successfully")
    }
    ).catch((error) => {
      // an error happened
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
            if (loggedIn && userData) {
              return <ul>
                <li>User : {userData.email}</li>
                <li><button type="button" onClick={() => handleLogout()}>Sign out</button></li>
              </ul>
            } else {
              return <li><Link to="/login"><button type="button">Sign in</button></Link></li>
            }
          }()
        }
        </ul>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} setQuoteNum={setQuoteNum} loggedIn={loggedIn}/>} />
        <Route path='/signup' element={<SignUp saveUserData={saveUserData}/>} />
        <Route path='/login' element={<LogIn saveUserData={saveUserData} />} />
        <Route path='/profile' element={<ProfilePage userData={userData}/>} />
      </Routes>
    </>
  )
}

export default App
