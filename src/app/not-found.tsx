import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-6 text-center grid-lines">
      <div>
        <p className="eyebrow justify-center">404</p>
        <h1 className="display text-7xl mt-6">
          This path
          <br />
          isn’t mapped yet.
        </h1>
        <p className="text-[#667085] mt-6">Let’s get you somewhere useful.</p>
        <Link className="button button-dark mt-8" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
