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
  <div>Choose your game length</div>
  <div>Short</div>
  <div>5 quotes</div>
  <Link to="/Quiz"><button onClick={() => { setQuoteNum(5); setQuizLength('5'); }}>{getButtonText('5')}</button></Link>
  <div>Medium</div>
  <div>10 quotes</div>
  <Link to="/Quiz"><button onClick={() => { setQuoteNum(10); setQuizLength('10'); }}>{getButtonText('10')}</button></Link>
  <div>Long</div>
  <div>15 quotes</div>
  <Link to="/Quiz"><button onClick={() => { setQuoteNum(15); setQuizLength('15'); }}>{getButtonText('15')}</button></Link>
  </>
}