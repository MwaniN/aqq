
export default function Choices ({animeName, handleClick, ref}) {


  return <div className={"choices"} onClick={handleClick} ref={ref}>
    {animeName}
  </div>
}