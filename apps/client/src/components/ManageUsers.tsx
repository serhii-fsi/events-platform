'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { searchUsers, ActionResponse } from 'src/app/actions';
import { UserEntity } from '@/domain/types';

import { Button } from '@/shadcnui/button';
import { Search } from 'lucide-react';
import { Input } from '@/shadcnui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcnui/form';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcnui/table';
import { ToggleGroup, ToggleGroupItem } from '@/shadcnui/toggle-group';

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
    if ((res as ActionResponse)?.success === false) {
      // error
      return;
    }
    setUsers(res as UserEntity[]);
  };

  return (
    <div className="flex flex-col gap-gap4 w-full max-w-md">
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
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Name/Email</TableHead>
              <TableHead className="text-center">Set Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.name}
                  <br />
                  {user.email}
                </TableCell>
                <TableCell>
                  <ToggleGroup
                    variant="outline"
                    type="single"
                    value={user.role}
                    onValueChange={(value) => {
                      console.log(user.id, user.email, value);
                    }}
                  >
                    <ToggleGroupItem value="user" aria-label="User">
                      U
                    </ToggleGroupItem>
                    <ToggleGroupItem value="editor" aria-label="Editor">
                      E
                    </ToggleGroupItem>
                    <ToggleGroupItem value="admin" aria-label="Admin">
                      A
                    </ToggleGroupItem>
                  </ToggleGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
