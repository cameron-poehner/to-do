import { styled } from '@mui/material/styles';

export const StyledContainer = styled('div')(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    width: '100vw',
    minHeight: '100vh',
    height: '100vh',
    backgroundPosition: 'cover',
    color: 'white',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    border: 'none',
}))