export default function NumberComponent({ sequence, index }: any) {
  return (
    <div className='table-cell align-middle w-24 w-24 md:w-28 md:h-28'>
      {sequence[index]}
    </div>
  );
}
