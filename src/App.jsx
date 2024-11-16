import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    axios(
      {
        method: 'get',
        url: 'https://animechan.io/api/v1/quotes/random',
        headers: {
          'x-api-key': `${import.meta.env.VITE_API_KEY}`
        }
      }).then(function (response) {
        console.log(response.data)
      setQuote(response.data.content);

    }).catch(
      function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
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
