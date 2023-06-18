import Link from "next/link";
import { useRouter } from "next/router";

export function NavTab({
  href,
  name,
  icon,
}: {
  href: string;
  name: string;
  icon: any;
}) {
  const router = useRouter();

  return (
    <>
      <Link
        href={href}
        style={{
          background: router.pathname === href ? "rgb(37, 99, 235)" : "#1e2024",
		//   color: router.pathname === href ? "rgb(48,48,48)" : "",
        }}
        className="transition-all duration-150 gap-2 flex items-center justify-center px-4 py-2 bg-elevation-2-dark rounded-full"
      >
        <div className="flex">{icon}</div>
        <span className="text-sm font-bold">{name}</span>
      </Link>
    </>
  );
}
