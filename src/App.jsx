import './App.css'
import { useState, useEffect} from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './auth/firebase.js';
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import LogIn from './auth/LogIn.jsx'
import SignUp from './auth/SignUp.jsx'

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {

        setLoggedIn(true)
        const email = user.email
        const uid = user.uid;
        console.log("uid", uid, "email", email)
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
        <ul>
        <li><Link to="/"><button type="button">Home</button></Link></li>
        {
          function (){
            if (loggedIn) {
              return <li><button type="button" onClick={() => handleLogout()}>Log Out</button></li>
            } else {
              return <li><Link to="/login"><button type="button">Log in</button></Link></li>
            }
          }()
        }
        </ul>
        <div id="title">
        Anime Quote Quiz
        </div>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} setQuoteNum={setQuoteNum}/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App
