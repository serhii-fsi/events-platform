'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { } from 'src/app/actions';
import { UserEntity } from '@/domain/types';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/shadcnui/button';
import { Save } from 'lucide-react';
import { Input } from '@/shadcnui/input';
import { toast } from '@/shadcnui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcnui/form';
import { EditEventSkeleton } from './EditEventSkeleton';

const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
});

export function ProfileForm({ user }: { user: UserEntity }) {
  const [loading, setLoading] = useState(false);

  const useFormReturn = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = async function (data: z.infer<typeof FormSchema>) {
    console.log(data);
    //
  };

  if (loading) {
    return <EditEventSkeleton />;
  }

  return (
    <Form {...useFormReturn}>
      <form
        onSubmit={useFormReturn.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-gap3 w-full max-w-sm"
      >
        <div className="flex justify-center pb-gap1">
          <Avatar user={user} className="h-[100px] w-[100px] text-text4" />
        </div>

        <FormField
          control={useFormReturn.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-gapText">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col gap-y-gapText">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your email"
              value={user.email}
              disabled={true}
            />
          </FormControl>
        </FormItem>

        <FormItem className="flex flex-col gap-y-gapText">
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Input value={user.role} disabled={true} />
          </FormControl>
        </FormItem>

        <div className="flex justify-center pt-gap2">
          <Button type="submit">
            <Save /> Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
