import Link from 'next/link';
import { Role } from '@/domain/constants';
import { AuthUser } from '@/domain/types';
import { ENV } from '@/utils/env';

import { Focus } from '@/components/Focus';
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

export const Menu = async ({ authUser }: { authUser: AuthUser }) => {
  const isAuthUser = Boolean(authUser?.id);
  const isAdmin = isAuthUser && authUser?.role === Role.ADMIN;
  const isEditor = isAuthUser && authUser?.role === Role.EDITOR;

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
          <div className="flex flex-col items-center gap-4" id="menu-content">
            <DrawerClose asChild>
              <Link
                href="/"
                role="menuitem"
                className="text-xl hover:text-gray-600 underline"
              >
                Homepage
              </Link>
            </DrawerClose>

            <Focus selector="a[role=menuitem]" />

            {!isAuthUser ? (
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

            {isAuthUser ? (
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

            {isEditor || isAdmin ? (
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

            {isAdmin ? (
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

            {isAuthUser ? (
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
