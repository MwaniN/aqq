import './App.css'
import {Route, Routes} from 'react-router'
import HomeScreen from './HomeScreen.jsx'
import Quiz from './Quiz.jsx'

function App() {


  return (
    <>
      <header id="header">
        <div id="title">
        Anime Quote Quiz
        </div>
      </header>
      <Routes>
        <Route path='/' element={<HomeScreen />}/>
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </>
  )
}

export default App
