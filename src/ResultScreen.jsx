// include option to save quote to their favorites in the future

export default function Result ({animeChoice, correctAnime, handleNextButton, loggedIn}) {

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