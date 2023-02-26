import { styled } from '@mui/material/styles';

export const StyledContainer = styled('header')(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        marginBottom: 20,
        alignItems: 'center'
    }
}));

export const StyledListHeader = styled('h1')(({ theme }) => ({
    fontFamily: 'Helvetica',
    fontSize: '50px',
    fontWeight: 400,
    [theme.breakpoints.down('xs')]: {
        fontSize: '40px'
    }
}))