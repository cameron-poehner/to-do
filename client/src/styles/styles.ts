import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// To-do: Find better way to set width/height properties; Create Theme and update styles accordingly

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FAF9F6',
            light: '#fff',
            dark: '#F9F6EE'
        },
        secondary: {
            main: '#FFFDD0',
            dark: '#F3E5AB',
            light: '#FFFFF0',
            contrastText: '#03C988'
        }
    },
    typography: {
        fontFamily: "'Monospace', 'Helvetica', 'Arial'"
    }
})

export const StyledPage = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: 'black',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '100vh',
    minwidth: '100vw',
    width: '100%',
    height: '100%',
    fontFamily: theme.typography.fontFamily
}))