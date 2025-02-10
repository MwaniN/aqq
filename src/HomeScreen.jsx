import {Link} from 'react-router'

export default function HomeScreen({setQuoteNum}) {

  return <>
  <div>Choose your game length</div>
  <div>Short</div>
  <Link to="/Quiz"><button onClick={() => setQuoteNum(5)}>5</button></Link>
  <div>Medium</div>
  <Link to="/Quiz"><button onClick={() => setQuoteNum(10)}>10</button></Link>
  <div>Long</div>
  <Link to="/Quiz"><button onClick={() => setQuoteNum(15)}>15</button></Link>
  </>
}