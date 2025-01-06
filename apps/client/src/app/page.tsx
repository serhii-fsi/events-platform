import { Events } from '@/components/layout/Events';

export default async function Page() {
  return (
    <div className="flex flex-col gap-y-gap5">
      {/* Banner Section */}
      <div className="flex flex-col items-center max-w-[800px] self-center gap-x-gap4 gap-y-gap1 sm:flex-row">
        <h1 className="text-text4 font-semibold sm:w-2/5 sm:text-end ">
          Events Platform
        </h1>
        <p className="text-text2 sm:w-3/5 sm:text-start">
          Explore the ultimate guide to local events, from gigs and clubs to
          festivals and more.
        </p>
      </div>

      <Events page={1} />
    </div>
  );
}
