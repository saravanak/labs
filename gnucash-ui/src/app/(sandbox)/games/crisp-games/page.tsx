'use client';

export default function CrispGamesPage() {
  return (
    <div className='relative rounded-xl overflow-auto p-8 h-screen'>
      <div className='grid grid-rows-3 grid-flow-col gap-4 font-mono text-sm text-center rounded-lg '>
        <div className='p-4 rounded-lg shadow-lg  grid place-content-center'>
          Jump over/on the numbers to increase your score
        </div>
        <div className='p-4 rounded-lg  grid place-content-center  row-span-2'>
          <iframe
            className='grid place-content-center w-[100%] md:w-[700px]'
            style={{ height: '500px' }}
            src='/crisp-games.html?number-jump'
            sandbox='allow-scripts '
          ></iframe>
        </div>
      </div>
    </div>
  );
}
