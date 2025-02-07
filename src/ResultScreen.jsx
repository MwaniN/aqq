// include option to save quote to their favorites in the future

export default function Result ({animeChoice, correctAnime, resetQuote}) {

  // show a different screen depending on if correct is false or not
  // have a button that moves on to the next quote

  // Input: The anime choice, the correctAnime, and whether the choice was right or not
  // Output: A screen (component) showing whether the choice was right or not. It should sit underneath the quote
  // on the main page.
  // Constraints: It needs to only appear after the choice was submitted and then be removed / cleared after
  // it moves on to the next quote.
  // Edge Cases:

  // use resetQuote when the button to choose next is hit

  return <div>
    {
      function(){
        if (animeChoice === correctAnime){
          return `Correct! You chose ${animeChoice} and the answer was ${correctAnime}`
        } else {
          return `Incorrect! You chose ${animeChoice} and the answer was ${correctAnime}`
        }
      }()
    }
    <button type="button">Next</button>
  </div>
}