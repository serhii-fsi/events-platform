import { Skeleton } from '@/shadcnui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcnui/card';

export const EventsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-gap2">
      {new Array(12).fill(true).map((key) => (
        <Card key={key} className="border-0">
          <CardHeader className="space-y-gap2 p-gap2">
            <CardTitle className="text-text2 leading-normal">
              <Skeleton className="h-gap3 w-full" />
            </CardTitle>
            <CardDescription className="text-text1 font-light space-y-gap2">
              <Skeleton className="h-gap3 w-3/5" />
              <Skeleton className="h-gap3 w-full" />
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
