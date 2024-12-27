import Link from 'next/link';
import { Api } from '../modules/api';

export const AuthStatus = async () => {
  const api = new Api();
  await api.fetchAuthStatus();

  if (api.isError()) {
    return null;
  }

  const user = api.getAuthUser();

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
