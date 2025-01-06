import { Skeleton } from '@/shadcnui/skeleton';

export const CentredSkeleton = () => {
  return (
    <div>
      <h1 className="text-text5 font-black mb-gap5 flex flex-col items-center">
        <Skeleton className="h-gap4 w-full max-w-sm" />
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-gap3 w-full max-w-lg">
          <div className="flex flex-row gap-x-gap3">
            <div className="w-2/3 flex flex-col gap-y-gap3">
              <Skeleton className="h-gap3 w-full" />
              <Skeleton className="h-gap3 w-3/5" />
              <Skeleton className="h-gap3 w-4/5" />
            </div>

            <div className="w-1/3">
              <Skeleton className="h-full w-full" />
            </div>
          </div>

          <Skeleton className="h-gap3 w-full" />
          <Skeleton className="h-gap3 w-full" />
          <Skeleton className="h-gap3 w-4/5" />
        </div>
      </div>
    </div>
  );
};
