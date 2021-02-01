module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          '100': '#cdfbfc',
          '200': '#acf8f8',
          '300': '#87f0f1',
          '400': '#73d3d4',
          '500': '#57CBCC',
          '600': '#3da6a7',
          '700': '#2da3a4',
          '800': '#157b7c',
          '900': '#0b5758'
        },
        blueGray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      }
    }
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: []
};
