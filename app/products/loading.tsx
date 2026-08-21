export default function ProductsLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="h-7 w-40 animate-pulse rounded-md bg-surface" />
      <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-surface" />

      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] animate-pulse rounded-2xl bg-surface"
          />
        ))}
      </div>
    </section>
  );
}
