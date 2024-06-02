export default function ({ options, selectedOption, onSelectedChange }: any) {
  const _selectedOption = options.find((o: any) => o.value == selectedOption);

  console.log({_selectedOption});
  
  
  return (
    <div>
      {options.map((option: any) => {
        return (
          <button
            key={option.value}
            onClick={() => {
              onSelectedChange(option.value);
            }}
          >
            {option.label}
          </button>
        );
      })}
      {_selectedOption ? <div> {_selectedOption.subText}</div> : null}
    </div>
  );
}

