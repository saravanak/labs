import getLedCoding from '@/utils/led/get-led-code';
import SevenSegmentDigit from '../seven-segment/digit';

const calculateMergedBits = (lhs: any, rhs: any) => {
  const intLHS = parseInt(lhs, 2);
  const intRHS = parseInt(rhs, 2);

  const mergedbits = (intRHS & intLHS).toString(2).split('');

  return mergedbits.join('').padStart(7, '0');
};

export default function IntersectingSegments({ answerCoding, word }: any) {
  {
    return word.split('').map((letter: any, letterIndex: any) => {
      const letterCoding = getLedCoding(letter, true);
      const intersectingSegments = calculateMergedBits(
        letterCoding,
        answerCoding[letterIndex]
      );
    
      return (
        <SevenSegmentDigit
          actualCommand={intersectingSegments}
          key={letterIndex}
          litColor='bg-green-500'
          unlitColor='bg-gray-700'
          bgColor='bg-gray-800'
          thickness='4px'
          height='13px'
          casing='small'
        />
      );
    });
  }
}

//1110000
//0001110
