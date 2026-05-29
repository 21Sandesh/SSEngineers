import Link from "next/link";

export default function NotFound() {
  return (
    <section className="blueprint text-white">
      <div className="h-1.5 w-full safety-stripes" />
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="mono-label !text-amber">Error 404</p>
        <h1 className="display-tight mt-4 text-5xl text-white sm:text-6xl">Page not found.</h1>
        <p className="mt-4 max-w-md text-white/70">
          The page you are looking for has moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-amber">
            Back home
          </Link>
          <Link href="/products" className="btn-ghost-light">
            View products
          </Link>
        </div>
      </div>
    </section>
  );
}
