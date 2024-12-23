/** @type {import('tailwindcss').Config} */

const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  darkMode: ['class'],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        color1: 'var(--color1)',
        color2: 'var(--color2)',
        color3: 'var(--color3)',
        color4: 'var(--color4)',
        color5: 'var(--color5)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      gap: {
        gap1: 'var(--gap1)',
        gap2: 'var(--gap2)',
        gap3: 'var(--gap3)',
        gap4: 'var(--gap4)',
        gap5: 'var(--gap5)',
      },
      padding: {
        gap1: 'var(--gap1)',
        gap2: 'var(--gap2)',
        gap3: 'var(--gap3)',
        gap4: 'var(--gap4)',
        gap5: 'var(--gap5)',
      },
      margin: {
        gap1: 'var(--gap1)',
        gap2: 'var(--gap2)',
        gap3: 'var(--gap3)',
        gap4: 'var(--gap4)',
        gap5: 'var(--gap5)',
      },
      width: {
        gap1: 'var(--gap1)',
        gap2: 'var(--gap2)',
        gap3: 'var(--gap3)',
        gap4: 'var(--gap4)',
        gap5: 'var(--gap5)',
      },
      height: {
        gap1: 'var(--gap1)',
        gap2: 'var(--gap2)',
        gap3: 'var(--gap3)',
        gap4: 'var(--gap4)',
        gap5: 'var(--gap5)',
      },
      fontSize: {
        text1: 'var(--text1)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
        text4: 'var(--text4)',
        text5: 'var(--text5)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

// Usage examples:
// Padding:
// <div className="p-gap1">Padding with gap-1</div>
// <div className="p-gap2">Padding with gap-2</div>
// <div className="p-gap3">Padding with gap-3</div>
// <div className="p-gap4">Padding with gap-4</div>
// <div className="p-gap5">Padding with gap-5</div>

// Margin:
// <div className="m-gap1">Margin with gap-1</div>
// <div className="m-gap2">Margin with gap-2</div>
// <div className="m-gap3">Margin with gap-3</div>
// <div className="m-gap4">Margin with gap-4</div>
// <div className="m-gap5">Margin with gap-5</div>

// Width and Height:
// <div className="w-gap1 h-gap1">Width and height with gap-1</div>
// <div className="w-gap2 h-gap2">Width and height with gap-2</div>
// <div className="w-gap3 h-gap3">Width and height with gap-3</div>
// <div className="w-gap4 h-gap4">Width and height with gap-4</div>
// <div className="w-gap5 h-gap5">Width and height with gap-5</div>

// Font Size:
// <div className="text-text1">Text size with text-1</div>
// <div className="text-text2">Text size with text-2</div>
// <div className="text-text3">Text size with text-3</div>
// <div className="text-text4">Text size with text-4</div>
// <div className="text-text5">Text size with text-5</div>

// Colors:
// <div className="bg-color1 text-color2">Background color with color1 and text color with color2</div>
// <div className="bg-color3 text-color4">Background color with color3 and text color with color4</div>
// <div className="bg-color5 text-color1">Background color with color5 and text color with color1</div>

// Border Radius:
// <div className="rounded-lg">Large border radius</div>
// <div className="rounded-md">Medium border radius</div>
// <div className="rounded-sm">Small border radius</div>
