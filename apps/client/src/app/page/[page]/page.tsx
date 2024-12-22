import { Events } from '@/components/layout/Events';

export default async function Index({
  params: { page },
}: {
  params: { page: string };
}) {
  return <Events page={page} />;
}
