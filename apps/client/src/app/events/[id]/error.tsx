'use client';

import { ErrorPage } from '@/components/ErrorPage';

export default function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage message={error.message} />;
}
