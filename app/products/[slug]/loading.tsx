export default function CategoryProductsLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="h-4 w-24 animate-pulse rounded-md bg-surface" />
      <div className="mt-4 h-7 w-48 animate-pulse rounded-md bg-surface" />
      <div className="mt-2 h-4 w-56 animate-pulse rounded-md bg-surface" />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] animate-pulse rounded-2xl bg-surface"
          />
        ))}
      </div>
    </section>
  );
}
