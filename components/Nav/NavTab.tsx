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
          borderColor: router.pathname === href ? "rgb(26,159,255)" : "#2e2e2e",
        }}
        className="transition-all duration-300 flex items-center justify-center px-4 bg-elevation-2-dark h-3/4 rounded-t-xl border-t-4 border-t-bgDark"
      >
        <span className="hidden 2cols:flex">{name}</span>
        <div className="flex 2cols:hidden">{icon}</div>
      </Link>
    </>
  );
}
