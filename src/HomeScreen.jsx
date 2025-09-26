import {Link} from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { resetQuiz } from './store/quizSlice'

export default function HomeScreen({setQuoteNum, setQuizLength}) {
  // Get quiz states from Redux
  const quizStates = useSelector(state => state.quiz);
  const dispatch = useDispatch();

  // Helper function to get button text
  const getButtonText = (quizLength) => {
    const quiz = quizStates[quizLength];
    if (quiz.quizInProgress) {
      return `Resume (${quiz.currentQuoteNum}/${quiz.totalQuotes})`;
    }
    return "Start";
  };

  // Helper function to check if quiz is in progress
  const isQuizInProgress = (quizLength) => {
    return quizStates[quizLength]?.quizInProgress || false;
  };

  // Handle clearing quiz - reset current quiz without starting new one
  const handleClearQuiz = (quizLength) => {
    // Reset the current quiz
    dispatch(resetQuiz({ quizLength }));
  };

  return <>
  <div>Test Your Anime Knowledge!</div>
  <div>Choose Your Path</div>
  
  <div>
    <div>Quick</div>
    <div>5 Quotes</div>
    <Link to="/Quiz"><button onClick={() => { setQuoteNum(5); setQuizLength('5'); }}>{getButtonText('5')}</button></Link>
    {isQuizInProgress('5') && (
      <button onClick={() => handleClearQuiz('5')}>Clear</button>
    )}
  </div>
  
  <div>
    <div>Extended</div>
    <div>10 Quotes</div>
    <Link to="/Quiz"><button onClick={() => { setQuoteNum(10); setQuizLength('10'); }}>{getButtonText('10')}</button></Link>
    {isQuizInProgress('10') && (
      <button onClick={() => handleClearQuiz('10')}>Clear</button>
    )}
  </div>
  
  <div>
    <div>Ultimate</div>
    <div>15 Quotes</div>
    <Link to="/Quiz"><button onClick={() => { setQuoteNum(15); setQuizLength('15'); }}>{getButtonText('15')}</button></Link>
    {isQuizInProgress('15') && (
      <button onClick={() => handleClearQuiz('15')}>Clear</button>
    )}
  </div>
  </>
}