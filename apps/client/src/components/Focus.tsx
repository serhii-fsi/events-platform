'use client';

import { useEffect } from 'react';

export const Focus = ({ selector }: { selector: string }) => {
  useEffect(() => {
    const el = document?.querySelector(`${selector}`) as HTMLElement;
    el.focus();
  }, [selector]);

  return null;
};
