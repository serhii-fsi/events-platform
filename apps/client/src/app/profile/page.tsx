import { fetchApi } from '@/utils/fetchApi';

export default async function Index() {
  const json = await fetchApi('/api/auth/status');

  if (json.error) {
    throw new Error(json.error);
  }

  const user = json?.data?.user;

  return <div> Profile {JSON.stringify(user)} </div>;
}
