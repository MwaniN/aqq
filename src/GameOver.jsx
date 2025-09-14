import {Link} from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function GameOver({finalScore, noReload}) {
  // Get auth state from Redux
  const { isAuthenticated, userData } = useSelector(state => state.auth);

  useEffect(() => {

    window.removeEventListener("beforeunload", noReload)

    if (isAuthenticated) {

      let scoreUpdate = {score: finalScore}
      axios.put('http://localhost:3000/update_stats', scoreUpdate, {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      }).then((response) =>
      {
        console.log(response)
      }).catch((error) => {
        console.log(error)
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