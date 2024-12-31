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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gap2">
      {new Array(12).fill(true).map((key) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle className="text-text2">
              <Skeleton className="h-8 w-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-36  w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
