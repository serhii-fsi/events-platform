'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { searchUsers } from 'src/app/actions';
import { UserEntity } from '@/domain/types';

import { Button } from '@/shadcnui/button';
import { Search } from 'lucide-react';
import { Input } from '@/shadcnui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcnui/form';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcnui/table';
import { toast } from '@/shadcnui/use-toast';

import { ManageUserRow } from './ManageUserRow';

const FormSchema = z.object({
  searchTerm: z
    .string()
    .min(3, { message: 'Search term must be at least 3 characters.' })
    .max(30, {
      message: 'Title must be at most 30 characters.',
    }),
});

export function ManageUsers() {
  const [searchLoading, setSearchLoading] = useState(false);
  const [users, setUsers] = useState<UserEntity[]>([]);

  const useFormReturn = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: '',
    },
  });

  const onSubmit = async function (data: z.infer<typeof FormSchema>) {
    setSearchLoading(true);
    const res = await searchUsers(data.searchTerm);
    setSearchLoading(false);

    if (res.success === false) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.message,
      });
      return;
    }

    setUsers(res.data.users);
  };

  return (
    <div className="flex flex-col gap-gap3 w-full max-w-lg">
      <Form {...useFormReturn}>
        <form
          onSubmit={useFormReturn.handleSubmit(onSubmit)}
          className="flex gap-gap2"
        >
          <FormField
            control={useFormReturn.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="flex-grow flex flex-col gap-y-gapText">
                <FormControl>
                  <Input
                    placeholder="Enter user's email or name"
                    disabled={searchLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={searchLoading}>
            <Search /> Search user
          </Button>
        </form>
      </Form>
      <div>
        <Table>
          {users.length === 20 ? (
            <TableCaption>Displays a maximum of 20 users</TableCaption>
          ) : null}
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Name/Email</TableHead>
              <TableHead className="text-center">Set Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <ManageUserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
