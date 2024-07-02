export default function CircledNumber({ value }: any) {
  return (
    <div className="flex">
      <div className="flex aspect-square items-center justify-center rounded-full bg-blue-600  w-8 h-8 text-gray-200" >
        <p>{value}</p>
      </div>
    </div>
  );
}
