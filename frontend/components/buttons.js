"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  // console.log("sign in button session", session, status);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      // <Link href={`/dashboard`} className="flex items-center">
      <div className="rounded-full overflow-hidden">
        <Image
          src={session.user?.image ?? "/mememan.webp"}
          width={32}
          height={32}
          alt="Your Name"
        />
      </div>
      // </Link>
    );
  }

  return (
    <button
      className="bg-neutral-800 rounded-lg text-white px-4 py-2 mr-5"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      className="bg-neutral-800 rounded-lg mx-5 bg-black text-white px-4 py-2"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
