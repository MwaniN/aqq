import {Link} from 'react-router'
import { useSelector } from 'react-redux'

export default function HomeScreen({setQuoteNum, setQuizLength}) {
  // Get quiz states from Redux
  const quizStates = useSelector(state => state.quiz);

  // Helper function to get button text
  const getButtonText = (quizLength) => {
    const quiz = quizStates[quizLength];
    if (quiz.quizInProgress) {
      return `Resume (${quiz.currentQuoteNum}/${quiz.totalQuotes})`;
    }
    return "Start";
  };

  return <>
  <div>Test Your Anime Knowledge!</div>
  <div>Pick Your Challenge:</div>
  <div>Quick</div>
  <div>5 Quotes</div>
  <Link to="/Quiz"><button onClick={() => { setQuoteNum(5); setQuizLength('5'); }}>{getButtonText('5')}</button></Link>
  <div>Extended</div>
  <div>10 Quotes</div>
  <Link to="/Quiz"><button onClick={() => { setQuoteNum(10); setQuizLength('10'); }}>{getButtonText('10')}</button></Link>
  <div>Ultimate</div>
  <div>15 Quotes</div>
  <Link to="/Quiz"><button onClick={() => { setQuoteNum(15); setQuizLength('15'); }}>{getButtonText('15')}</button></Link>
  </>
}