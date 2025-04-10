/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Root index.html file
    './src/**/*.{js,ts,jsx,tsx}', // All files in src folder and subfolders
     './src/**/*', // Covers any other files (like .html, .mdx) in src folder
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

