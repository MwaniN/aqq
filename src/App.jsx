import './App.css'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import LogIn from './auth/LogIn.jsx'
import SignUp from './auth/SignUp.jsx'

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);

  return (
    <>
      <header id="header">
        <ul>
        <li><Link to="/"><button type="button">Home</button></Link></li>
        <li><button type="button">Log In</button></li>
        </ul>
        <div id="title">
        Anime Quote Quiz
        </div>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} setQuoteNum={setQuoteNum}/>} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App
