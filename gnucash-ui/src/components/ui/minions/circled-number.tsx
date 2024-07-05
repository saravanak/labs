export default function CircledNumber({ value }: any) {
  return (
    <div className="flex">
      <div className="flex aspect-square items-center justify-center rounded-full bg-blue-600  w-6 h-6 text-gray-200 text-xs text-center" >
        <p>{value}</p>
      </div>
    </div>
  );
}
