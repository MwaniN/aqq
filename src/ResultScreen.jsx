// include option to save quote to their favorites in the future

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

  // Success messages (all mentioning anime name)
  const successMessages = [
    "🎉 Perfect! That's from " + correctAnime,
    "🎯 Excellent! You nailed it! That's from " + correctAnime,
    "⭐ Great catch! That's from " + correctAnime,
    "🔥 Amazing! You got it right! That's from " + correctAnime,
    "💯 Spot on! That's from " + correctAnime
  ];

  // Failure messages (all mentioning anime name)
  const failureMessages = [
    "❌ Close! The correct answer was " + correctAnime,
    "🤔 Not quite! It's from " + correctAnime,
    "💭 That's a tricky one! The answer is " + correctAnime,
    "👍 Good try! The correct answer was " + correctAnime,
    "🤷‍♂️ Not this time! It's from " + correctAnime
  ];

  // Success encouragement messages
  const successEncouragement = [
    "Great deduction skills!",
    "You're getting the hang of this!",
    "That was a tough one!",
    "Nice work!",
    "Excellent!",
    "Well done!",
    "Perfect!",
    "Outstanding!"
  ];

  // Failure encouragement messages
  const failureEncouragement = [
    "Don't worry, that's a hard one!",
    "Even experts miss that one sometimes!",
    "That's a really obscure reference!",
    "Nice try!",
    "That was tricky!",
    "No worries, keep going!",
    "You'll get the next one!"
  ];

  // Randomly select messages
  shuffleArray(successMessages);
  shuffleArray(failureMessages);
  shuffleArray(successEncouragement);
  shuffleArray(failureEncouragement);

  const selectedMessage = isRight ? successMessages[0] : failureMessages[0];
  const selectedEncouragement = isRight ? successEncouragement[0] : failureEncouragement[0];

  return <div>
    {selectedMessage + " " + selectedEncouragement}
    {/* {
      function(){
        if (loggedIn) {
          return <button type="button">Add Quote to favorites</button>
        }
      }()
    } */}
    <button type="button" className="advance-button" onClick={() => handleNextButton()}>Next</button>
  </div>
}