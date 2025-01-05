import { UserEntity } from '@/domain/types';

import { Avatar as A, AvatarFallback, AvatarImage } from '@/shadcnui/avatar';

const sanitizeName = (name: string) => {
  return name.trim().replace(/\s+/g, ' ');
};

const getFirstLetters = (name: string) => {
  return sanitizeName(name)
    .split(' ')
    .filter((word) => word.length > 0)
    .slice(0, 2) // only take the first two words
    .map((word) => word[0].toUpperCase())
    .join('');
};

export function Avatar({
  user,
  className,
}: {
  user: UserEntity;
  className: string;
}) {
  return (
    <A className={className}>
      <AvatarImage src="https://github.com/shadcn.png" alt="user avatar" />
      <AvatarFallback>{getFirstLetters(user.name)}</AvatarFallback>
    </A>
  );
}
