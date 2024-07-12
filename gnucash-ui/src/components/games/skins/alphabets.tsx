import { useContext, useRef } from 'react';
import { LettersContext } from '../puzzle-15';
import Image from 'next/image';

export default function AlphabetComponent({ sequence, index }: any) {
  const letters: any = useContext(LettersContext);

  const imageRef = useRef(null);
  let letterIndex = sequence[index];

  if (!letterIndex || !letters) {
    return <div className='table-cell align-middle'></div>;
  }

  const currentLetter = letters[sequence[index] - 1]?.image;
  return (
    <>
      <div className='table-cell align-middle w-24 w-24 md:w-28 md:h-28'>
        <Image alt='' src={currentLetter} />
      </div>
    </>
  );
}
