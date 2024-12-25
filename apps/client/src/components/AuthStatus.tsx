import Link from 'next/link';
import { Api } from '../modules/api';
import { UserProfileResponseDto } from '@/dto';

export const AuthStatus = async () => {
  const api = new Api<UserProfileResponseDto>(`/api/auth/status`);
  await api.fetch();
  if (api.isError()) {
    //
  }
  const data = api.getData();
  const user = data?.data?.user;
  return (
    <div className="flex gap-gap1 items-center">
      {user ? (
        <div>
          <div>
            <Link href="/profile" className="text-text1 underline">
              {user.name}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
