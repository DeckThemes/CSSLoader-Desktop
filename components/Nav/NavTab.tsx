import Link from "next/link";
import { useRouter } from "next/router";

export function NavTab({ href, name, icon }: { href: string; name: string; icon: any }) {
  const router = useRouter();

  return (
    <>
      <Link
        href={href}
        style={{
          background: router.pathname === href ? "rgb(37, 99, 235)" : "#1e2024",
          //   color: router.pathname === href ? "rgb(48,48,48)" : "",
        }}
        className="mx-3 flex h-fit items-center justify-center gap-2 rounded-full bg-elevation-2-dark px-4 py-2 transition-all duration-150"
      >
        <div className="flex">{icon}</div>
        <span className="text-sm font-bold">{name}</span>
      </Link>
    </>
  );
}
