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
      <DrawerTrigger className="">
        <svg
          width="100"
          height="39"
          viewBox="0 0 100 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.5" width="100" height="6" fill="black" />
          <rect y="16.5" width="30" height="6" fill="black" />
          <rect y="32.5" width="60" height="6" fill="black" />
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className=" text-2xl text-center mb-6">Menu</DrawerTitle>
          <div className="flex flex-col items-center gap-4">
            <DrawerClose asChild>
              <Link href="/" className="text-xl hover:text-gray-600 underline">
                Homepage
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <a
                href={env.API_URL + env.AUTH0_LOGIN_PATH}
                className="text-xl hover:text-gray-600 underline"
              >
                Login / Sign up
              </a>
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
              <a
                href={env.API_URL + env.AUTH0_LOGOUT_PATH}
                className="text-xl hover:text-gray-600 underline"
              >
                Log Out
              </a>
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
