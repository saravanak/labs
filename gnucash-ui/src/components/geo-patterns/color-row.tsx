export default function ColorRow({isSelectedColor, onClickColor, colorIndex, color}:any) {
    return <>
    
                <div
                  key={colorIndex}
                  className={`aspect-square p-2 w-[30px] h-[30px] rounded-md   ml-2 ${
                    isSelectedColor ? "ring-2 ring-zinc-500 shadow-xl" : "border-gray-300 border-[1px] "
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onClickColor( colorIndex)}
                >
                  &nbsp;
                </div>
    
              </>
}