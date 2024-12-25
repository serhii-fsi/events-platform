import { Api } from 'src/modules/api';
import { UserProfileResponseDto } from '@/dto';

export default async function Page() {
  const api = new Api<UserProfileResponseDto>('/api/auth/status');
  await api.fetch();

  if (api.isError()) {
    throw new Error(api.getUiErrorMessage());
  }

  const data = api.getData();

  const user = data?.data?.user;

  return <div> Profile {JSON.stringify(user)} </div>;
}
