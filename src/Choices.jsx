
export default function Choices ({animeName, handleClick, currentSelection}) {


  return <div className={"choices"} onClick={handleClick} ref={currentSelection}>
    {animeName}
  </div>
}