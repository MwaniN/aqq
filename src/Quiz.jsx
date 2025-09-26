import { useState, useEffect } from 'react'
import Choices from './Choices.jsx'
import {APICalls} from './APICalls.jsx'
import ResultScreen from './ResultScreen.jsx'
import GameOver from './GameOver.jsx'
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { startQuiz, setCurrentQuote, submitAnswer, advanceQuote, resetQuiz } from './store/quizSlice';


export default function Quiz ({totalQuotes, quizLength}) {
  // Get auth state from Redux
  const { isAuthenticated, userData } = useSelector(state => state.auth);
  
  // Get quiz state from Redux for specific quiz length
  const quizState = useSelector(state => state.quiz[quizLength] || {});
  const {
    currentQuote,
    currentChoices,
    correctAnime,
    currentScore,
    currentQuoteNum,
    submissionMade,
    gameOver,
    finalChoice,
    quizInProgress
  } = quizState;
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function shuffle(arr) {
    let array = arr;

      for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }

    return array
  }

  let currentChoice = null;

  // API wrapper function that works with Redux
  function loadQuoteData() {
    let quoteData = {};
    
    APICalls(
      (quote) => {
        quoteData.quote = quote;
      },
      (correctAnime) => {
        quoteData.correctAnime = correctAnime;
      },
      (choices) => {
        // Now we have all the data, dispatch to Redux
        dispatch(setCurrentQuote({
          quizLength,
          quote: quoteData.quote,
          correctAnime: quoteData.correctAnime,
          choices: choices
        }));
      }
    );
  }


  useEffect(() => {

      // Don't do anything if game is over
      if (gameOver) {
        return;
      }

      // send them home if they refresh the page, they can resume from there
      if (totalQuotes == null || quizLength == null) {
        navigate("/")
      }

      // Start quiz if not already in progress and not game over
      if (!quizInProgress && !gameOver && totalQuotes) {
        dispatch(startQuiz({ quizLength, totalQuotes }));
      }

      // Load quote data if we don't have current quote data and quiz is in progress and not game over
      if (!currentQuote && quizInProgress && !gameOver && totalQuotes) {
        loadQuoteData();
      }

  }, [navigate, totalQuotes, quizLength, quizInProgress, currentQuote, gameOver, dispatch])

  function handleClick(animeName) {
    // Update their current choice
    currentChoice = animeName
  }

  function resetQuote() {
    currentChoice = null
  }

  function advanceToNextQuote () {
    // Just dispatch the advance action - the useEffect will handle loading new data
    dispatch(advanceQuote({ quizLength }));
  }

  function handleNextButton() {
    resetQuote()
    advanceToNextQuote()
  }

  function handleSubmit() {

    if (currentChoice == null) {
      alert(`Please select an anime first!`)
    } else {
      dispatch(submitAnswer({ quizLength, choice: currentChoice }));
    }
  }


  return <>

  <div id="hud">
      <div className="hud-item">
        Quote {currentQuoteNum}/{totalQuotes}
      </div>
      <div className="hud-item progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentQuoteNum / totalQuotes) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {Math.round((currentQuoteNum / totalQuotes) * 100)}%
        </div>
      </div>
      <div className="hud-item">
        Score: {currentScore}
      </div>
    </div>
    {function(){
      if (!gameOver) {
        return <div id="quote-container">
        <div className="quote">
        &quot;{
          function (){
            // can add loading icons in the future
            let currQuote = currentQuote || "Loading your next challenge...";
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
          return <GameOver finalScore={currentScore} quizLength={quizLength} />
        } else if(submissionMade && !gameOver) {
          return <ResultScreen animeChoice={finalChoice} correctAnime={correctAnime} handleNextButton={handleNextButton} loggedIn={isAuthenticated}/>
        } else if (currentChoices && currentQuote) {
          return <div className="prompt">Which anime is this quote from?</div>
        } else if (currentQuote && !currentChoices) {
          return "Preparing your options..."
        }
      }()}
      <div className="choices-container">
          {function (){
            if (currentChoices && !submissionMade) {
              let animeArray = currentChoices.slice();
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
          if (currentChoices && !submissionMade){
            return <button className="advance-button" type="button" onClick={handleSubmit}>Submit</button>
          }
        }()
      }

    </div>

  </>
}

