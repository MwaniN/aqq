
export default function Choices ({animeName, handleClick, tabIndex}) {


  return <div className={"choices"} onClick={() => handleClick(animeName)} tabIndex={tabIndex}>
    {animeName}
  </div>
}