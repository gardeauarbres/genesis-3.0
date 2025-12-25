/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                neon: {
                    blue: '#2563eb',
                    purple: '#8b5cf6',
                    cyan: '#06b6d4',
                    pink: '#ec4899',
                }
            }
        },
    },
    plugins: [],
}
