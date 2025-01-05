import { Events } from '@/components/layout/Events';

export default async function Page() {
  return (
    <div className="flex flex-col gap-y-gap2">
      {/* Banner Section */}
      <div className="flex flex-row items-center gap-gap2 max-w-2xl self-center">
        <h1 className="w-2/5 text-text3 font-bold text-end">Events Platform</h1>
        <p className="w-3/5 text-text1 text-start">
          Explore the ultimate guide to local events, from gigs and clubs to
          festivals and more.
        </p>
      </div>
      <Events page={1} />
    </div>
  );
}
