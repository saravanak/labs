export default function AppContent({ children }: any) {
  return (
    <div className="col-span-2 md:col-span-1 h-[calc(100svh-75px)]">
      <div className=" container mx-auto p-4 md:p-16">{children}</div>
    </div>
  );
}
