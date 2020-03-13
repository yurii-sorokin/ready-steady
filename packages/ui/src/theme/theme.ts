export const colors = {
  dark: '#2c3031',
  dark2: '#383d3e',

  orange: '#fe4f28',

  grey: '#646668',
  grey2: '#bbb9b9',

  white: '#f9f3ef',
  white2: '#f2e5dc',
  white3: '#f4f4f4',

  gold: '#ffdd00',
  silver: '#eaeaea',
  bronze: '#ba7625',

  blue: '#d9f5ff',
  red: '#cd192e'
};

export const darkTheme = {
  colors: {
    primary: {
      normal: colors.dark,
      minor: colors.dark2
    },
    secondary: {
      normal: colors.orange
    },
    border: {
      normal: colors.grey
    },
    card: {
      normal: colors.dark,
      inverted: colors.white
    },
    text: {
      primary: colors.white,
      secondary: colors.white,
      inverted: colors.dark,
      disabled: colors.grey
    },
    status: {
      danger: colors.red
    }
  },
  shadows: {
    normal: '0 0 5px 0 rgba(0, 0, 0, 0.1)'
  },
  space: ['0px', '5px', '10px', '15px', '20px', '25px', '30px', '35px', '40px'],
  breakpoints: {
    xs: '0px',
    sm: '450px',
    md: '768px',
    lg: '1170px',
    xl: '1440px'
  },
  radii: {
    normal: '10px',
    double: '20px',
    small: '3px'
  }
};

export const lightTheme: Theme = {
  ...darkTheme,

  colors: {
    ...darkTheme.colors,
    primary: {
      normal: colors.white,
      minor: colors.white2
    },
    secondary: {
      normal: colors.orange
    },
    border: {
      normal: colors.grey
    },
    card: {
      normal: colors.white,
      inverted: colors.dark
    },
    text: {
      primary: colors.dark,
      secondary: colors.white,
      inverted: colors.white,
      disabled: colors.grey2
    }
  }
};

export type Theme = typeof darkTheme;
