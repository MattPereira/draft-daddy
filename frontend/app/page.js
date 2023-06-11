import { CsvForm } from "./CsvForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthCheck from "@/components/AuthCheck";

export default async function Home() {
  // getServerSession to deterimine if logged in user from a server component
  // note that we dont' have to 'use client' in this server component
  // but we can still tell if there is a user session!
  const session = await getServerSession();
  console.log("Home SESSION", session);

  return (
    <main>
      <div className="my-20">
        <div className="flex justify-center">
          {session ? (
            <CsvForm />
          ) : (
            <h3 className="text-white font-cubano text-2xl">
              Sign in to upload your csv
            </h3>
          )}
        </div>
      </div>
    </main>
  );
}
