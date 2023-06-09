import Link from "next/link";
// import Image from "next/image";
// import { SignInButton, SignOutButton } from "../components/buttons";
// import AuthCheck from "@/components/AuthCheck";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Players", href: "/" },
  { name: "Teams", href: "/" },
  { name: "Matchups", href: "/" },
];

// By default all components in Next.js are server components

export default function Navigation() {
  return (
    <nav className="flex items-center bg-amber-500 h-[70px] justify-between font-cubano">
      <Link href={"/"} className="ml-5">
        <div className="text-xl">Draft Daddy</div>
      </Link>
      <ul className="flex">
        {navItems.map((item) => (
          <li key={item.name} className="mr-5 flex items-center">
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
        <li className="flex items-center">{/* <SignInButton /> */}</li>
        <li>
          {/* <AuthCheck> */}
          {/* <SignOutButton /> */}
          {/* </AuthCheck> */}
        </li>
      </ul>
    </nav>
  );
}
