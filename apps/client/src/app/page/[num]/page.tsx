import { Events } from '@/components/layout/Events';

export default async function Page({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const pageNum = Number(num);
  if (!pageNum || num !== String(pageNum)) {
    throw new Error('No page number provided');
  }

  return <Events page={pageNum} />;
}
