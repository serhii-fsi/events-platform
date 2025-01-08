import { ErrorPage } from '@/components/ErrorPage';
import { Role } from '@/domain/constants';
import { Api } from 'src/modules/api';
import { createEvent } from 'src/app/actions';

import { EventForm } from '@/components/EventForm';

export default async function Page() {
  const apiAuth = new Api();
  await apiAuth.fetchAuthUser();

  if (apiAuth.isError()) {
    return <ErrorPage message={apiAuth.getUiErrorMessage()} />;
  }

  const authUser = apiAuth.getAuthUser();
  if (authUser?.role !== Role.EDITOR && authUser?.role !== Role.ADMIN) {
    return <ErrorPage message="Only editors and admins can create events" />;
  }

  return (
    <div>
      <h1 className="text-text5 font-black text-center mb-gap5">
        Create Event
      </h1>
      <EventForm {...{ formAction: createEvent, redirect: 'replace' }} />
    </div>
  );
}
