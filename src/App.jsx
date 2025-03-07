import './App.css'
import { useState, useEffect} from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './auth/firebase.js';
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import LogIn from './auth/LogIn.jsx'
import SignUp from './auth/SignUp.jsx'
import ProfilePage from './ProfilePage.jsx';
import { useLocalStorage } from "@uidotdev/usehooks";
// clear local storage when the user logs out

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {

        setLoggedIn(true)
        // set profile name and email universally while logged in, can use state with an object and / or local storage
        console.log("user is logged in dude")
      } else {

        setLoggedIn(false)
        console.log("user is logged out")
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
            if (loggedIn) {
              return <li><button type="button" onClick={() => handleLogout()}>Sign out</button></li>
            } else {
              return <li><Link to="/login"><button type="button">Sign in</button></Link></li>
            }
          }()
        }
        </ul>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} setQuoteNum={setQuoteNum}/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
