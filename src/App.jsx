import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
// import apiKey from './assets/apiKey.jsx';

function App() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    axios(
      {
        method: 'get',
        url: 'https://animechan.io/api/v1/quotes/random',
        headers: {
          'x-api-key': 'KEY GOES HERE'
        }
      }).then(function (response) {
      setQuote(response.data.content);

    }).catch(
      function(error) {
        console.log(error);
        setQuote(`${error}`)
      }
    )
  }, [])

  return (
    <>
      <header id="header">
        <div id="title">
        Anime Quote Quiz
        </div>

      </header>
      <div id="hud">
        <div className="hud-item">
          Quote 1/10
        </div>
        <div className="hud-item">
          Score: 0
        </div>
      </div>
      <div id="quote-container">
        <div className="quote">
        &quot;{
          function (){
            let currQuote = quote || "Quote incoming...";
            return currQuote;
          }()
        }&quot;
        </div>
      </div>
      <div id="guess-container">
        <div className="prompt">What anime is this from?</div>
        <div className="choices-container">
            <div className="choice">Choice 1</div>
            <div className="choice">Choice 2</div>
            <div className="choice">Choice 3</div>
            <div className="choice">Choice 4</div>
            <div className="choice">Choice 5</div>
            <div className="choice">Choice 6</div>
        </div>
        <button type="submit">Enter</button>

      </div>
    </>
  )
}

export default App
