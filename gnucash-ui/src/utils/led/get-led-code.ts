export default function getLedCoding(input: string, isSmallCasing: boolean) {
  let segmentCommand: any = '';
  switch (input) {
    case '1':
      segmentCommand = '0110000';
      break;
    case '2':
      segmentCommand = '1101101';
      break;
    case '3':
      segmentCommand = '1111001';
      break;
    case '4':
      segmentCommand = '0110011';
      break;
    case '5':
      segmentCommand = '1011011';
      break;
    case '6':
      segmentCommand = '1011111';
      break;
    case '7':
      segmentCommand = '1110000';
      break;
    case '8':
      segmentCommand = '1111111';
      break;
    case '9':
      segmentCommand = '11110111';
      break;
    case '0':
      segmentCommand = '1111110';
      break;
    case 'a':
      segmentCommand = isSmallCasing ? '1111101' : '1110111';
      break;
    case 'b':
      segmentCommand = isSmallCasing ? '0011111' : null;
      break;
    case 'c':
      segmentCommand = isSmallCasing ? '0001101' : '1001110';
      break;
    case 'd':
      segmentCommand = isSmallCasing ? '0111101' : '1001110';
      break;
    case 'e':
      segmentCommand = isSmallCasing ? '1101111' : '1001111';
      break;
    case 'f':
      segmentCommand = isSmallCasing ? '1000111' : '1001111';
      break;
    case 'g':
      segmentCommand = isSmallCasing ? '1111011' : '1001111';
      break;
    case 'h':
      segmentCommand = isSmallCasing ? '0010111' : '0010111';
      break;
    case 'i':
      segmentCommand = isSmallCasing ? '0110000' : null;
      break;
    case 'j':
      segmentCommand = isSmallCasing ? '0111000' : null;
      break;
    case 'l':
      segmentCommand = isSmallCasing ? '0001110' : '0001110';
      break;
    case 'n':
      segmentCommand = isSmallCasing ? '0010101' : null;
      break;
    case 'o':
      segmentCommand = isSmallCasing ? '0011101' : '1111110';
      break;
    case 'p':
      segmentCommand = isSmallCasing ? '1100111' : null;
      break;
    case 'q':
      segmentCommand = isSmallCasing ? '1110011' : null;
      break;
    case 'r':
      segmentCommand = isSmallCasing ? '0000101' : '0100111';
      break;

    case 's':
      segmentCommand = isSmallCasing ? '1011011' : null;
      break;
    case 't':
      segmentCommand = '0001111';
      break;
    case 'u':
      segmentCommand = '0011100';
      break;
    case 'y':
      segmentCommand = '0111011';
      break;
    case 'z':
      segmentCommand = '1101101';
      break;
    default:
      segmentCommand = '0000001'; //- sign
  }
  return segmentCommand;
}
