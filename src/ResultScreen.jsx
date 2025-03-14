// include option to save quote to their favorites in the future

export default function Result ({animeChoice, correctAnime, handleNextButton, loggedIn}) {

  // show a different screen depending on if correct is false or not
  // have a button that moves on to the next quote

  // Input: The anime choice, the correctAnime, and whether the choice was right or not
  // Output: A screen (component) showing whether the choice was right or not. It should sit underneath the quote
  // on the main page.
  // Constraints: It needs to only appear after the choice was submitted and then be removed / cleared after
  // it moves on to the next quote.
  // Edge Cases:

  // use resetQuote when the button to choose next is hit

  // game over screen can go here too

  // make score update immediately if it's correct

  let isRight = false;

  if (animeChoice === correctAnime) {
    isRight = true;
  }

  return <div>
    {
      function(){
        if (isRight){
          return `Correct! You chose ${animeChoice} and the quote was from ${correctAnime}`
        } else {
          return `Wrong! You chose ${animeChoice} and the quote was from ${correctAnime}`
        }
      }()
    }
    {
      function(){
        if (loggedIn) {
          return <button type="button">Add Quote to favorites</button>
        }
      }()
    }
    <button type="button" className="advance-button" onClick={() => handleNextButton()}>Next</button>
  </div>
}