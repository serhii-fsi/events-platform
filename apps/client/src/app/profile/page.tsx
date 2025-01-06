import { Api } from 'src/modules/api';

import { ProfileForm } from '@/components/ProfileForm';

export default async function Page() {
  const api = new Api();
  await api.fetchAuthUser();

  if (api.isError()) {
    throw new Error(api.getUiErrorMessage());
  }

  const user = api.getAuthUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return (
    <div>
      <h1 className="text-text5 font-black text-center mb-gap5">Profile</h1>
      <div className="flex flex-col items-center">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
