import {Link} from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';

export default function GameOver({finalScore, noReload, loggedIn}) {

  useEffect(() => {

    window.removeEventListener("beforeunload", noReload)

    if (loggedIn) {
      axios.put('http://localhost:3000/update_stats', {
        score : finalScore
      })
    }
  })

  let endingArr = [`You are a regular savant.`, `You went full Super Saiyan.`, `Good job.`, `Nice.`]

  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let rndInt = randomIntFromInterval(0, endingArr.length - 1);

  let finalQuote = endingArr[rndInt]


  return (
    <>
    <div>
      {
        function(){

          if (finalScore > 0) {
            return <div>{`Congratulations! You got ${finalScore} correct. ${finalQuote}`}</div>
          } else {
            return <div>Better luck next time! You got 0 correct.</div>
          }
        }()
      }
    </div>
    <Link to="/"><button type="button" className="advance-button">Return Home</button></Link>
    </>
  )
}