import { fetchApi } from '@/utils/fetchApi';
import Link from 'next/link';

export const AuthStaus = async () => {
  const json = await fetchApi('/api/auth/status');
  const user = json?.data?.user;

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
