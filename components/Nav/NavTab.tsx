import Link from "next/link";
import { useRouter } from "next/router";

export function NavTab({ href, name, icon }: { href: string; name: string; icon: any }) {
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent, href: string) => {
	if (e.key === "Enter") {
		router.push(href)
	}
  }

  return (
    <>
      <button
	  	role="link"
	  	onClick={() => router.push(href)}
		onKeyDown={(e) => handleKeyDown(e, href)}
        style={{
          background: router.pathname === href ? "rgb(37, 99, 235)" : "#1e2024",
        }}
        className="flex h-fit items-center justify-center gap-2 rounded-full bg-elevation-2-dark px-4 py-2 transition-all duration-150 hover:scale-95 hover:active:scale-90"
      >
        <div className="flex">{icon}</div>
        <span className="text-sm font-bold">{name}</span>
      </button>
    </>
  );
}
