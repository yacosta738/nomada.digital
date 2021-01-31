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
      }
    }
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: []
};
