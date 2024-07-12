export default function ButtonGroup({
  options,
  selectedOption,
  onSelectedChange,
}: any) {
  const _selectedOption = options.find((o: any) => o.value == selectedOption);

  return (
    <div className='flex flex-col justify-center items-center	mt-4'>
      <div className='flex justify-center'>
        {options.map((option: any) => {
          return (
            <button
              className={`border p-2 hover:bg-gray-200 ${
                _selectedOption == option ? 'bg-blue-200 border-blue-300' : null
              }`}
              key={option.value}
              onClick={() => {
                onSelectedChange(option.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {_selectedOption ? (
        <div className='mt-2 text-sm'> {_selectedOption.subText}</div>
      ) : null}
    </div>
  );
}
