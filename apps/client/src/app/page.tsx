import { Events } from '@/components/layout/Events';

export default async function Index() {
  return (
    <div className="flex flex-col gap-y-gap2">
      {/* Banner Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-text4 font-bold">Explore Local Events</h1>
        <p className="text-text1">
          Your guide to gigs, clubs, festivals, and more!
        </p>
      </div>
      <Events />;
    </div>
  );
}
