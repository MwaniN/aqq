import {Link} from 'react-router'

export default function GameOver({finalScore}) {

  let endingArr = [`You are a regular savant.`, `You went full Super Saiyan.`, `Good job.`]

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