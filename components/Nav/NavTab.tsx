import { useRouter } from "next/router";
import { KeyboardEvent, useEffect } from "react";

export function NavTab({ href, name, icon }: { href: string; name: string; icon: any }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/store");
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, href: string) => {
    if (e.key === "Enter") {
      router.push(href);
    }
  };

  return (
    <>
      <button
        role="link"
        onClick={() => router.push(href)}
        onKeyDown={(e) => handleKeyDown(e, href)}
        style={{
          background: router.pathname === href ? "rgb(37, 99, 235)" : "#1e2024",
        }}
        className="flex h-fit items-center justify-center gap-2 rounded-full border-4 border-transparent bg-elevation-2-dark px-4 py-2 transition-all duration-150 hover:scale-95 focus-visible:border-amber9 hover:active:scale-90"
      >
        <div className="flex">{icon}</div>
        <span className="text-sm font-bold">{name}</span>
      </button>
    </>
  );
}
