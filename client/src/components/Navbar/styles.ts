import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledNav = styled('nav')(({ theme }) => ({
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    zIndex: 10,
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center'
    }
}));

export const StyledLinkContainer = styled('div')(({ theme }) => ({
    width: '15%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
}))

export const StyledLink = styled(Link)(({ theme }) => ({
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.secondary.dark,
        transition: 'color, text-decoration 4s ease-in-out',
        textDecoration: 'underline',
    }
}))