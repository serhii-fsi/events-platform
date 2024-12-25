import { Events } from '@/components/layout/Events';

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  return <Events page={page} />;
}
