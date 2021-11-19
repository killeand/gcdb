module.exports = {
    mode: "jit",
    purge: {
      enabled: true,
      content: [
        './src/**/*.{js,jsx,html,css}'
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
}