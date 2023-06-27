
export function AppFrame({ children }: { children: any }) {
  return (
    <div className="cssloader-app-frame absolute inset-0 overflow-hidden rounded-lg">
      {children}
    </div>
  );
}
