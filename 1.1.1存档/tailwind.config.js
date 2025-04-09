module.exports = {
  content: ["./*.html", "./assets/**/*.{js,css}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dhr-orange': '#ff6b00',
        'dhr-blue': '#0066cc'
      },
      fontFamily: {
        'serif': ['"Noto Serif SC"', 'serif'],
        'sans': ['"Noto Sans SC"', 'sans-serif']
      }
    }
  },
  plugins: [],
}