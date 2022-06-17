
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f0c75',
    },
    secondary: {
      main: '#98145b',
    },
    background: {
      default: '#2d2b2b',
      paper: '#eae7f5',
    },
    text: {
      primary: 'rgba(39,37,37,0.87)',
    },
  },
});

function CustomTheme (props) {
    return <>
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    </>
}

export default CustomTheme;