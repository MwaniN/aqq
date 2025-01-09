import { useState, useEffect } from 'react'
import './App.css'
import Choices from './Choices.jsx'
import {APICalls} from './APICalls.jsx'

function shuffle(arr) {
  let array = arr;

    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

  return array
}

function App() {

  // define the hooks
  const [quote, setQuote] = useState(null);
  const [correctAnime, setCorrectAnime] = useState(null);
  const [choices, setChoices] = useState(null);
  const [currQuoteNum, setNum] = useState(1);
  const [currScore, setScore] = useState(0);

  let currentChoice = null;

  useEffect(() => {
    APICalls(setQuote, setCorrectAnime, setChoices)
  }, [])

  function handleClick(animeName) {
    // Update their current choice
    currentChoice = animeName
  }

  function handleSubmit() {

    if (currentChoice == null) {
      alert(`Please select an anime first!`)
    } else if (correctAnime === currentChoice) {
        alert(`You are correct! It is ${currentChoice}!`);
        currentChoice = null;
      } else {
        alert(`Wrong! It was ${correctAnime}`)
      }
  }

  return (
    <>
      <header id="header">
        <div id="title">
        Anime Quote Quiz
        </div>

      </header>
      <div id="hud">
        <div className="hud-item">
          Quote {currQuoteNum}/10
        </div>
        <div className="hud-item">
          Score: {currScore}
        </div>
      </div>
      <div id="quote-container">
        <div className="quote">
        &quot;{
          function (){
            let currQuote = quote || "Quote incoming...";
            return `${currQuote}`;
          }()
        }&quot;
        </div>
      </div>
      <div id="guess-container">
        <div className="prompt">What anime is this from?</div>
        <div className="choices-container">
            {function (){
              if (choices) {
                let animeArray = choices.slice();
                console.log("This is correctAnime", correctAnime)
                animeArray.push(correctAnime);
                animeArray = shuffle(animeArray);

                let animeChoices = animeArray.map(function (anime) {
                  return <Choices animeName={anime} key={animeArray.indexOf(anime)} handleClick={handleClick}/>
              })

              return animeChoices;
            }
            }()}
        </div>
        <button type="button" onClick={handleSubmit}>Submit</button>

      </div>
    </>
  )
}

export default App
