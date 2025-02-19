import './App.css'
import { useState, useEffect} from 'react'
import { Link, Route, Routes } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth/firebase.js';
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import LogIn from './auth/LogIn.jsx'
import SignUp from './auth/SignUp.jsx'

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {

        const uid = user.uid;
        console.log("uid", uid)
      } else {

        console.log("user is logged out")
      }
    })
  }

  )

  return (
    <>
      <header id="header">
        <ul>
        <li><Link to="/"><button type="button">Home</button></Link></li>
        <li><Link to="/login"><button type="button">Log in</button></Link></li>
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
