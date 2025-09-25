// include option to save quote to their favorites in the future

import { useMemo } from 'react';

function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function Result ({animeChoice, correctAnime, handleNextButton, loggedIn}) {

  let isRight = false;

  if (animeChoice === correctAnime) {
    isRight = true;
  }

  const resultMessage = useMemo(() => {
    // Success messages (all mentioning anime name)
    const successMessages = [
      "🎉 Perfect! That's from " + correctAnime + ".",
      "🎯 Excellent! You nailed it! That's from " + correctAnime + ".",
      "⭐ Great catch! That's from " + correctAnime + ".",
      "🔥 Amazing! You got it right! That's from " + correctAnime + ".",
      "💯 Spot on! That's from " + correctAnime + "."
    ];

    // Failure messages (all mentioning anime name)
    const failureMessages = [
      "❌ Close! The correct answer was " + correctAnime + ".",
      "🤔 Not quite! It's from " + correctAnime + ".",
      "💭 That's a tricky one! The answer is " + correctAnime + ".",
      "👍 Good try! The correct answer was " + correctAnime + ".",
      "🤷‍♂️ Not this time! It's from " + correctAnime + "."
    ];

    // Success encouragement messages
    const successEncouragement = [
      "Great deduction skills!",
      "You're getting the hang of this!",
      "That was a tough one!",
      "Nice work!",
      "Excellent!",
      "Well done!",
      "Fantastic!",
      "Outstanding!"
    ];

    // Only shuffle the arrays we need
    if (isRight) {
      shuffleArray(successMessages);
      shuffleArray(successEncouragement);
      return successMessages[0] + " " + successEncouragement[0];
    } else {
      shuffleArray(failureMessages);
      return failureMessages[0];
    }
  }, [isRight, correctAnime]);

  return <div>
    {resultMessage}
    <button type="button" className="advance-button" onClick={() => handleNextButton()}>Next</button>
  </div>
}