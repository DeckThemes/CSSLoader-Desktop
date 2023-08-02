export function AppFrame({ children }: { children: any }) {
  return (
    <div className="cssloader-app-frame absolute inset-0 overflow-hidden rounded-lg border-x-[1px] border-b-[1px] border-[#2f2f2f]">
      {children}
    </div>
  );
}
