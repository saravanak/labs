export default function CardListing({ children }: any) {
  return (
    <div className="grid grid-cols-[4rem_1fr_4rem] lg:grid-cols-[repeat(2,1fr)] xl:grid-cols-[repeat(3,1fr)] gap-4 grid-rows-auto place-content-center justify-items-center auto-cols-fr">
      {children}
    </div>
  );
}
