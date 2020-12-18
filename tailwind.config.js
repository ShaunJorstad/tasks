module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      navBackground: {
        light: '#E5E5E4', 
        DEFAULT: '#E5E5E4', 
        dark: '#E5E5E4'
      },
      tileUnselected: {
        light: '#CACBCB',
        DEFAULT: '#CACBCB',
        dark: '#CFCFCE'
      },
      tileSelected: {
        light: '#5C6269',
        DEFAULT: '#5C6269',
        dark: '#5C6269'
      },
      tileUnselectedBorder: {
        light: '#CECDCE',
        DEFAULT: '#CECDCE',
        dark: '#CECDCE'
      },
      tileSelectedTitle: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#ffffff'
      }, 
      tileUnselectedTitle: {
        light: '#5C6269',
        DEFAULT: '#5C6269',
        dark: '#5C6269'
      },
      red: '#EC4D3D',
      blue: '#2F7CF6',
      gray: '#5C6269'
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}