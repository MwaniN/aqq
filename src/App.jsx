import './App.css'
import { useState } from 'react'
import {Route, Routes} from 'react-router'
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'

function App() {

  const [totalQuotes, setQuoteNum] = useState(null);


  return (
    <>
      <header id="header">
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
