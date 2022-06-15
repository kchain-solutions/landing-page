
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#4576B1',
      },
      secondary: {
        main: '#57AAB3',
      },
      text: {
        primary: 'rgba(26,25,25,0.87)',
      },
      background: {
        default: '#FFFFFF',
        paper: 'rgba(69,118,177,0.05)',
      }
    }
});

function Layout (props) {
    return <>
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    </>
}

export default Layout;