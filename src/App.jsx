import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Choices from './Choices.jsx'

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array
}



function App() {

  // define the hooks
  const [quote, setQuote] = useState(null);
  const [correctAnime, setCorrectAnime] = useState(null);
  const [choices, setChoices] = useState(null);

  useEffect(() => {
    // retrive the first anime quote
    axios.get(`http://localhost:3000/randomQuote`
      ).then(function (response) {
        console.log(response.data, " This is response.data")
        console.log(response.data.anime, " This is response.anime")
      setQuote(response.data.content);
      setCorrectAnime(response.data.anime.name);

      axios.get(`http://localhost:3000/random3Anime`
      ).then( function (response) {
        console.log(response, ' This is the response from the random3Anime call')
        let choiceArray = response.data
        setChoices(choiceArray)
        console.log(choiceArray, " This is the initial choiceArray")

      }
      ).catch(
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
                let animeArray = choices;
                animeArray.push(correctAnime);
                animeArray = shuffle(animeArray);
                console.log(animeArray, " this is the final choice array w/ the correct name")

                animeArray.map(function (anime) {
                  return <Choices animeName={anime} key={animeArray.indexOf(anime)} />
              })
            }
            }()}
        </div>
        <button type="submit">Enter</button>

      </div>
    </>
  )
}

export default App
