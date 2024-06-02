import { useContext, useEffect, useRef } from "react";
import { LettersContext } from "../puzzle-15";

//https://openclipart.org/image/800px/172241
export default function ({ sequence, index }: any) {
  const letters:any = useContext(LettersContext);

  const imageRef = useRef(null);
  let letterIndex = sequence[index];

  if(!letterIndex || !letters)  {
    return <div className="table-cell align-middle"></div>
  }

  const currentLetter = letters[sequence[index]-1]?.image
  return (
    <>
      
      <div className="table-cell align-middle">
        <img src={currentLetter } />
      </div>
    </>
  );
}



// rabbit 
// zebra 
// tiger