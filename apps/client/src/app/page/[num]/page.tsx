import { Events } from '@/components/layout/Events';

export default async function Page({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  if (!num) {
    throw new Error('No page number provided');
  }

  const page = num || '1'; // Default to '1' if page is not provided

  return <Events page={page} />;
}
