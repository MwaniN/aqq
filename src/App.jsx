import './App.css'
import { useState } from 'react'
import {Link, Route, Routes} from 'react-router'
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'
import Auth from './auth/Auth.jsx'

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);
  const [login, setLogin] = useState(false)

  function handleclick() {
    console.log("The click handler worked")
    if (login === false) {
      console.log("login is false")
      return <Auth />
    }

  }


  return (
    <>
      <header id="header">
        <ul>
        <li><Link to="/"><button>Home</button></Link></li>
        <li><button type="button" onClick={() => {handleclick()}}>Log In</button></li>
        </ul>
        <div id="title">
        Anime Quote Quiz
        </div>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen setQuoteNum={setQuoteNum} />}/>
        <Route path='/quiz' element={<Quiz totalQuotes={totalQuotes} setQuoteNum={setQuoteNum}/>} />
      </Routes>
    </>
  )
}

export default App
