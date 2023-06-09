import { Metadata } from "next";

export const dynamic = "force-static"; // no necessary, just for demonstration

export const metadata: Metadata = {
  title: "About Page",
  description: "Best Ball Draft Analytics",
};

export default async function About() {
  return (
    <div className="py-10 text-white">
      <h1 className="font-cubano text-4xl mb-5">About</h1>
      <p>We are a best ball draft analytics company</p>
    </div>
  );
}
