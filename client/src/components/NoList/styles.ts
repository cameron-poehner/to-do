import { styled } from '@mui/material/styles';

export const StyledContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    width: '70%',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: `0px 3px 5px rgb(0, 0, 0, 0.2)`,
}));

export const StyledH1 = styled('h1')(({ theme }) => ({
    fontFamily: 'helvetica',
    fontWeight: 400,
    [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
        padding: 10
    }
}))