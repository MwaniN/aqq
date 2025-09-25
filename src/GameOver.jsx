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
  }, [dispatch, isAuthenticated, quizLength])

  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Messages for 0 correct
  const zeroCorrectMessages = [
    "🎯 Every expert was once a beginner. You're just getting started!",
    "🌟 Don't worry! These quotes are really tricky - even anime fans struggle with them!",
    "💪 That was tough! These are some of the hardest anime quotes around!",
    "🎊 No worries! You're building your anime quote knowledge - keep going!",
    "🔥 These quotes are super obscure! You're learning as you go!"
  ];

  // Messages for 1+ correct (mix of new + original)
  const onePlusCorrectMessages = [
    "🎉 Great job! You got " + finalScore + " correct!",
    "🌟 Nice work! " + finalScore + " out of " + quizLength + " - that's solid!",
    "🎊 Well done! You got " + finalScore + " right!",
    "⭐ Good effort! " + finalScore + " correct answers!",
    "🔥 Nice! You got " + finalScore + " out of " + quizLength + "!",
    "💪 Great attempt! You got " + finalScore + " correct!",
    "🎊 Awesome! You got " + finalScore + " right!",
    "🏆 Excellent! " + finalScore + " out of " + quizLength + " correct!",
    "You got " + finalScore + " out of " + quizLength + " correct! You are a regular savant.",
    "You got " + finalScore + " out of " + quizLength + " right! You went full Super Saiyan.",
    "You got " + finalScore + " correct! Good job.",
    "You got " + finalScore + " out of " + quizLength + " correct! Nice."
  ];

  // Messages for perfect score
  const perfectScoreMessages = [
    "🏆 Flawless Victory! You're an anime legend!",
    "🌟 Perfect Score! You're a true anime quote master!",
    "🎉 100%! Incredible work!",
    "💯 Perfect! You nailed every single one!"
  ];

  // Select appropriate message array and randomize
  let messageArray;
  if (finalScore === 0) {
    messageArray = zeroCorrectMessages;
  } else if (finalScore === parseInt(quizLength)) {
    messageArray = perfectScoreMessages;
  } else {
    messageArray = onePlusCorrectMessages;
  }

  shuffleArray(messageArray);
  let finalQuote = messageArray[0];


  return (
    <>
    <div>
      {finalQuote}
    </div>
    <Link to="/"><button type="button" className="advance-button">Return Home</button></Link>
    </>
  )
}