/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    "DEFAULT": "#df8e57",
                    "50": "#fff1e7",
                    "100": "#fae3d5",
                    "200": "#f0c7ab",
                    "300": "#e6a87d",
                    "400": "#df8e57",
                    "500": "#da7e3e",
                    "600": "#d87430",
                    "700": "#c06323",
                    "800": "#ab571c",
                    "900": "#964a13"
                },
                'secondary': {
                    'DEFAULT': '#3c89dd',
                    "50": "#e6f6ff",
                    "100": "#d3e7fc",
                    "200": "#a9ccf2",
                    "300": "#7bb0e9",
                    "400": "#5598e1",
                    "500": "#3c89dd",
                    "600": "#2d81db",
                    "700": "#1d6fc3",
                    "800": "#0f62b0",
                    "900": "#00559c"
                },
                'tertiary': {
                    'DEFAULT': '#ed2a52',
                    "50": "#ffe8f0",
                    "100": "#ffd1db",
                    "200": "#f9a2b4",
                    "300": "#f46f8b",
                    "400": "#f04568",
                    "500": "#ed2a52",
                    "600": "#ed1947",
                    "700": "#d40838",
                    "800": "#bd0030",
                    "900": "#a60028"
                }
            }
        },
    },
    plugins: [],
}

