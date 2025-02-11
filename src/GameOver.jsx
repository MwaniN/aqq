import {Link} from 'react-router'

export default function GameOver({finalScore}) {

  return (
    <>
    <div>
      {
        function(){
          if (finalScore > 0) {
            return <div>{`Congratulations! You got ${finalScore} correct. You are a regular savant.`}</div>
          } else {
            return <div>Better luck next time! You got 0 correct.</div>
          }
        }()
      }
    </div>
    <Link to="/"><button>Return Home</button></Link>
    </>
  )
}