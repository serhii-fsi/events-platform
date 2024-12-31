'use client';

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
