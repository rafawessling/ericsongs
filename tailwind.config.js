/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', 'sans-serif'],
            },
            backgroundColor: {
                primary: '#1B1B1D',
                secondary: '#0C0C0E',
            },
            backgroundImage: {
                'gradient-signin-mobile':
                    'linear-gradient(180deg, rgba(27, 27, 29, 0) 0%, #1B1B1D 50%)',
                'gradient-signin-desktop':
                    'linear-gradient(180deg, rgba(12, 12, 14, 0) 0%, #0C0C0E 24.28%)',
                'gradient-signup':
                    'linear-gradient(0deg, rgba(27, 27, 29, 0) 0%, #1B1B1D 50%)',
            },
        },
    },
    plugins: [],
};
