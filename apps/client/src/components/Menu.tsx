import env from '@/utils/getEnv';

import Link from 'next/link';
import { Button } from '@/shadcnui/button';
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
  return (
    <Drawer>
      <DrawerTrigger className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        ☰
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl mb-6">Menu</DrawerTitle>
          <div className="flex flex-col items-center gap-4">
            <DrawerClose asChild>
              <Link href="/" className="text-xl hover:text-gray-600 underline">
                Homepage
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={env.API_URL + env.AUTH0_LOGIN_PATH}
                className="text-xl hover:text-gray-600 underline"
              >
                Login / Sign up
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/profile"
                className="text-xl hover:text-gray-600 underline"
              >
                Profile
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/events/create"
                className="text-xl hover:text-gray-600 underline"
              >
                Create Event
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/admin"
                className="text-xl hover:text-gray-600 underline"
              >
                Manage Users
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={env.API_URL + env.AUTH0_LOGOUT_PATH}
                className="text-xl hover:text-gray-600 underline"
              >
                Log Out
              </Link>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close Menu</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
