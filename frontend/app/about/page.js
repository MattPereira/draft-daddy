export const dynamic = "force-static"; // no necessary, just for demonstration

export const metadata = {
  title: "About Page",
  description: "Best Ball Draft Analytics",
};

export default async function About() {
  return (
    <div className="py-10 text-white">
      <h1 className="font-cubano text-4xl mb-5">About</h1>
      <p>Best ball draft analytics for fantasy football</p>
    </div>
  );
}
