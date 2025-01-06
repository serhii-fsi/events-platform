import { Role } from '@/domain/constants';
import { Api } from 'src/modules/api';

import { ManageUsers } from '@/components/ManageUsers';

export default async function Page() {
  const apiAuth = new Api();
  await apiAuth.fetchAuthUser();

  if (apiAuth.isError()) {
    throw new Error(apiAuth.getUiErrorMessage());
  }

  const authUser = apiAuth.getAuthUser();

  if (authUser?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  return (
    <div>
      <h1 className="text-text5 font-black text-center mb-gap5">
        Manage Users
      </h1>
      <div className="flex flex-col items-center">
        <ManageUsers />
      </div>
    </div>
  );
}
