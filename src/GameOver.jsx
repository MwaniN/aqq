import {Link} from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from './store/quizSlice';
import { updateUserStats } from './store/authSlice';

export default function GameOver({finalScore, quizLength}) {
  // Get auth state from Redux
  const { isAuthenticated, userData } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    if (isAuthenticated && userData && userData.token) {

      let scoreUpdate = {
        score: finalScore,
        gameType: quizLength.toString() // Convert quizLength to string ('5', '10', or '15')
      }
      axios.put('http://localhost:3000/update_stats', scoreUpdate, {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      }).then((response) =>
      {
        console.log(response)
        // Update Redux state with the returned stats
        const { high_score, games_played, total_games_played, game_type } = response.data
        dispatch(updateUserStats({
          gameType: game_type,
          highScore: high_score,
          gamesPlayed: games_played,
          totalGamesPlayed: total_games_played
        }))
      }).catch((error) => {
        console.log(error)
      })
    }
    
    // Reset quiz state when component unmounts (user goes back to home)
    return () => {
      dispatch(resetQuiz({ quizLength }));
    };
  }, [dispatch, isAuthenticated, userData, finalScore])

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