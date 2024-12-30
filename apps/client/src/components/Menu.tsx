import Link from 'next/link';
import { getAuthUser } from 'src/modules/api';

import { ENV } from '@/utils/env';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shadcnui/drawer';

export const Menu = async () => {
  const authUser = await getAuthUser();

  return (
    <Drawer>
      <DrawerTrigger className="" aria-label="Open menu" aria-haspopup="dialog">
        <svg
          className="text-foreground"
          width="100"
          height="39"
          viewBox="0 0 100 39"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect y="0.5" width="100" height="6" fill="currentColor" />
          <rect y="16.5" width="30" height="6" fill="currentColor" />
          <rect y="32.5" width="60" height="6" fill="currentColor" />
        </svg>
      </DrawerTrigger>
      <DrawerContent aria-label="Navigation menu">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-center mb-6">Menu</DrawerTitle>
          <DrawerDescription className="sr-only">
            Navigation menu for the website
          </DrawerDescription>
          <div className="flex flex-col items-center gap-4">
            <DrawerClose asChild>
              <Link
                href="/"
                role="menuitem"
                className="text-xl hover:text-gray-600 underline"
              >
                Homepage
              </Link>
            </DrawerClose>

            {!authUser ? (
              <DrawerClose asChild>
                <a
                  href={ENV.API_URL + ENV.AUTH0_LOGIN_PATH}
                  role="menuitem"
                  className="text-xl hover:text-gray-600 underline"
                >
                  Login / Sign up
                </a>
              </DrawerClose>
            ) : null}

            {authUser ? (
              <DrawerClose asChild>
                <Link
                  href="/profile"
                  role="menuitem"
                  className="text-xl hover:text-gray-600 underline"
                >
                  Profile
                </Link>
              </DrawerClose>
            ) : null}

            {authUser?.role === 'editor' || authUser?.role === 'admin' ? (
              <DrawerClose asChild>
                <Link
                  href="/create-event"
                  role="menuitem"
                  className="text-xl hover:text-gray-600 underline"
                >
                  Create Event
                </Link>
              </DrawerClose>
            ) : null}

            {authUser?.role === 'admin' ? (
              <DrawerClose asChild>
                <Link
                  href="/admin"
                  role="menuitem"
                  className="text-xl hover:text-gray-600 underline"
                >
                  Manage Users
                </Link>
              </DrawerClose>
            ) : null}

            {authUser ? (
              <DrawerClose asChild>
                <a
                  href={ENV.API_URL + ENV.AUTH0_LOGOUT_PATH}
                  role="menuitem"
                  className="text-xl hover:text-gray-600 underline"
                >
                  Log Out
                </a>
              </DrawerClose>
            ) : null}
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close Menu</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
