// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const lorem = "Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc sed dolor laoreet litora hac sollicitudin etiam. Mus orci curae odio ante sit egestas mattis per lobortis. Lobortis sapien parturient blandit; facilisi a felis consequat facilisis. Blandit auctor nisl felis hendrerit cubilia. Dui accumsan commodo magnis per elit mattis sollicitudin. Faucibus fames at nisi hendrerit magna. Enim posuere vel turpis nunc venenatis donec ridiculus convallis molestie. Turpis dis inceptos ultricies imperdiet integer lacus dolor."

  return (
    <>
      <header id="header">
        <div id="title">
        Anime Quote Quiz
        </div>

      </header>
      <div id="hud">
        <div className="hud-item">
          Quote 1/10
        </div>
        <div className="hud-item">
          Score: 0
        </div>
      </div>
      <div id="quote-container">
        <div className="quote">
        &quot;{lorem}&quot;
        </div>
      </div>
      <div id="guess-container">
        <div className="prompt">What anime is this from?</div>
        <div className="choices-container">
            <div className="choice">Choice 1</div>
            <div className="choice">Choice 2</div>
            <div className="choice">Choice 3</div>
            <div className="choice">Choice 4</div>
            <div className="choice">Choice 5</div>
            <div className="choice">Choice 6</div>
        </div>
        <button type="submit">Enter</button>

      </div>
    </>
  )
}

export default App
