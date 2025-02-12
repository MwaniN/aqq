import { useState, useEffect } from 'react'
import Choices from './Choices.jsx'
import {APICalls} from './APICalls.jsx'
import ResultScreen from './ResultScreen.jsx'
import GameOver from './GameOver.jsx'

export default function Quiz ({totalQuotes}) {

  // add logic to check for page refresh and take them
  // back to the home screen

  function shuffle(arr) {
    let array = arr;

      for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }

    return array
  }

  // define the hooks
  const [quote, setQuote] = useState(null);
  const [correctAnime, setCorrectAnime] = useState(null);
  const [choices, setChoices] = useState(null);
  const [currQuoteNum, setNum] = useState(1);
  const [currScore, setScore] = useState(0);
  const [submissionMade, setSubmissionMade] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalChoice, setFinalChoice] = useState(null);

  let currentChoice = null;

  useEffect(() => {
    APICalls(setQuote, setCorrectAnime, setChoices)
  }, [])

  function handleClick(animeName) {
    // Update their current choice
    currentChoice = animeName
  }

  function resetQuote() {
    currentChoice = null
    setQuote(null);
    setCorrectAnime(null)
    setChoices(null)
    setSubmissionMade(false)
  }

  function advanceQuote () {
    if (currQuoteNum === totalQuotes) {
      setGameOver(true)
      console.log("this should start the game over screen")
    } else {
      let newQuoteNum = currQuoteNum + 1
      setNum(newQuoteNum)
      APICalls(setQuote, setCorrectAnime, setChoices)
    }
  }

  function handleNextButton() {
    resetQuote()
    advanceQuote()
  }

  function handleSubmit() {

    if (currentChoice == null) {
      alert(`Please select an anime first!`)
    } else {
      setFinalChoice(currentChoice)
      // update the score before rendering the results
      if (currentChoice === correctAnime) {
        let newScore = currScore + 1
        setScore(newScore)
      }
      setSubmissionMade(true)
    }
  }


  return <>

  <div id="hud">
      <div className="hud-item">
        Quote {currQuoteNum}/{totalQuotes}
      </div>
      <div className="hud-item">
        Score: {currScore}
      </div>
    </div>
    {function(){
      if (!gameOver) {
        return <div id="quote-container">
        <div className="quote">
        &quot;{
          function (){
            // can add loading icons in the future
            let currQuote = quote || "Quote incoming...";
            return `${currQuote}`;
          }()
        }&quot;
        </div>
      </div>
      }
    }()}
    <div id="guess-container">
      {function (){

        if (gameOver) {
          return <GameOver finalScore={currScore}/>
        } else if(submissionMade && !gameOver) {
          return <ResultScreen animeChoice={finalChoice} correctAnime={correctAnime} handleNextButton={handleNextButton}/>
        } else if (choices && quote) {
          return <div className="prompt">What anime is this from?</div>
        } else if (quote && !choices) {
          return "Choices incoming..."
        }
      }()}
      <div className="choices-container">
          {function (){
            if (choices && !submissionMade) {
              let animeArray = choices.slice();
              console.log("This is correctAnime", correctAnime)
              animeArray.push(correctAnime);
              animeArray = shuffle(animeArray);

              let animeChoices = animeArray.map(function (anime) {
                return <Choices animeName={anime} key={animeArray.indexOf(anime)} tabIndex={animeArray.indexOf(anime)} handleClick={handleClick}/>
            })

            return animeChoices;
          }
          }()}
      </div>
      {
        function (){
          if (choices && !submissionMade){
            return <button className="advance-button" type="button" onClick={handleSubmit}>Submit</button>
          }
        }()
      }

    </div>

  </>
}
