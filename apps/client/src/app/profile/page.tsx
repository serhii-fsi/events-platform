import { Api } from 'src/modules/api';

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
    <div className="my-gap5">
      <h1 className="text-4xl font-black text-center mb-gap5">Profile</h1>
      <div className="flex flex-col gap-gap2 items-center">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
}
