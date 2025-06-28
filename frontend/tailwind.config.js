import daisyul from 'daisyui'
import themes from 'daisyui/theme/object'

/** @type {import(`tailwindcss`).Config} */

export default {
    content: ["./index.html", "./src/**/*.{us,ts,jsx,tsx}"],
    teme: {
        extend: {}
    },
    plugin: [daisyul],
    themes: ["lignt", 'dark', "cupcake", "retro"]
}