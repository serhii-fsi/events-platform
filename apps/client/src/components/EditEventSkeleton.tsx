import { Skeleton } from '@/shadcnui/skeleton';

export const EditEventSkeleton = () => {
  return (
    <div className="flex flex-col gap-gap5 w-full md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-3/5">
        <div className="flex flex-col gap-y-gap3">
          <div className="flex flex-col gap-y-gapText">
            <Skeleton className="h-6 w-20" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>
          <div className="flex flex-col gap-y-gapText">
            <Skeleton className="h-6 w-32" /> {/* Label */}
            <Skeleton className="h-[300px] w-full" /> {/* Textarea */}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full flex flex-col gap-y-gap3 md:w-2/5">
        <div className="flex gap-gap2">
          <div className="w-2/3">
            <Skeleton className="h-6 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full mt-2" /> {/* DatePicker */}
          </div>
          <div className="w-1/3">
            <Skeleton className="h-6 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full mt-2" /> {/* Time Input */}
          </div>
        </div>
        <div className="flex gap-gap2">
          <div className="w-2/3">
            <Skeleton className="h-6 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full mt-2" /> {/* DatePicker */}
          </div>
          <div className="w-1/3">
            <Skeleton className="h-6 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full mt-2" /> {/* Time Input */}
          </div>
        </div>
        <div className="flex flex-col gap-y-gapText">
          <Skeleton className="h-6 w-28" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Location Input */}
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" /> {/* Button */}
        </div>
      </div>
    </div>
  );
};
