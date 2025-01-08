'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/shadcnui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const isDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);

    document.documentElement.classList.toggle('dark', isDarkMode);
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setIsDark(newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="rounded-full p-0 h-[40px] w-[40px]"
      aria-label="Toggle dark/light theme"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
