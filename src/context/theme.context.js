import React, {
  createContext,
  useState,
  useContext,
  useMemo,
} from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import grey from '@material-ui/core/colors/grey';
import lightblue from '@material-ui/core/colors/lightBlue';

export const ThemeDispatchContext = createContext();
export const ThemeStateContext = createContext();

export const commonSettings = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        ul: {
          listStyle: 'none',
          padding: 0,
        },
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '18px',
        lineHeight: 1.2395,
        '@media (min-width:600px)': {
          fontSize: '14px',
          lineHeight: 1.2475,
        },
      },
      body2: {
        marginRight: 16,
      },
      h6: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: 1.2395,
      },
    },
    MuiList: {
      root: {
        maxWidth: '100%',
        backgroundColor: 'inherit',
        position: 'relative',
        '@media (min-width:600px)': {
          marginLeft: '8rem',
        },
      },
    },
    MuiListItem: {
      root: {
        // paddingLeft: '2px',
        paddingTop: 0,
        paddingBottom: 0,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minHeight: 'calc(2em + 2px)',
        borderBottom: '1px solid',
        // paddingRight: 0,
      },
      gutters: {
        paddingLeft: '2px',
        paddingRight: 0,
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: '18px',
        lineHeight: 1.2395,
        '@media (min-width:600px)': {
          fontSize: '14px',
          lineHeight: 1.2475,
        },
      },
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiListRoot: {
      color: '#988534',
    },
  },
};

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ff3200',
    },
    secondary: {
      main: grey[900],
    },
  },
  ...commonSettings,
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lightblue[500],
    },
    secondary: {
      main: '#fafafa',
    },
    background: {
      default: '#151515',
    },
  },
  ...commonSettings,
});

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [value, setValue] = useState('launch');
  const [meta, setMeta] = useState(true);
  const [root, setRoot] = useState('');
  const prefersDarkMode = useMediaQuery(
    '(prefers-color-scheme: dark)'
  );

  useMemo(
    () => (prefersDarkMode ? setDarkMode(true) : setDarkMode(false)),
    [prefersDarkMode]
  );

  return (
    <ThemeDispatchContext.Provider
      value={{
        darkMode,
        setDarkMode,
        value,
        setValue,
        meta,
        setMeta,
        root,
        setRoot,
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeDispatchContext.Provider>
  );
};

export const useDispatchTheme = () =>
  useContext(ThemeDispatchContext);
export const useThemeState = () => useContext(ThemeStateContext);
