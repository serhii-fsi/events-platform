'use client';

import { useState } from 'react';
import { updateUserRole } from 'src/app/actions';
import { UserEntity } from '@/domain/types';
import { Role } from '@/domain/constants';

import { TableCell, TableRow } from '@/shadcnui/table';
import { ToggleGroup, ToggleGroupItem } from '@/shadcnui/toggle-group';
import { toast } from '@/shadcnui/use-toast';
import { Skeleton } from '@/shadcnui/skeleton';

export function ManageUserRow({ user }: { user: UserEntity }) {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(user.role);

  const onChange = async function (value: Role) {
    if (!value) return;

    setLoading(true);
    const res = await updateUserRole(user.id as number, value);
    setLoading(false);

    if (res.success === true) {
      setUserRole(value);

      toast({
        variant: 'default',
        title: 'Success',
        description: res.message,
      });
    } else if (res.success === false) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.message,
      });
    }
  };

  return (
    <TableRow key={user.id}>
      <TableCell>
        {loading ? <Skeleton className="h-[40px] w-[38px]" /> : userRole}
      </TableCell>
      <TableCell>
        {user.name}
        <br />
        {user.email}
      </TableCell>
      <TableCell>
        {loading ? (
          <div className="flex items-center justify-center gap-1">
            <Skeleton className="h-[40px] w-[40px]" />
            <Skeleton className="h-[40px] w-[40px]" />
            <Skeleton className="h-[40px] w-[40px]" />
          </div>
        ) : (
          <ToggleGroup
            variant="outline"
            type="single"
            value={userRole}
            onValueChange={onChange}
          >
            <ToggleGroupItem value={Role.USER} aria-label={Role.USER}>
              U
            </ToggleGroupItem>
            <ToggleGroupItem value={Role.EDITOR} aria-label={Role.EDITOR}>
              E
            </ToggleGroupItem>
            <ToggleGroupItem value={Role.ADMIN} aria-label={Role.ADMIN}>
              A
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      </TableCell>
    </TableRow>
  );
}
