/** @type {import('tailwindcss').Config} */
export const mode = ['jit']
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    colors: {
      backgroundColor: 'var(--background)',
      primary: 'var(--primary)',
      neutral: {
        DEFAULT: '#333333',
        dark: '#333333',
        light: '#333333',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
}
export const plugins = []
