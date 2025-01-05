
export default function Choices ({animeName, handleClick}) {


  return <div className={"choices"} onClick={handleClick}>
    {animeName}
  </div>
}