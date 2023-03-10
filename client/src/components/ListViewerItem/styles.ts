import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledContainer = styled('div')(({ theme }) => ({
    fontSize: '20px',
    height: 'auto',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    boxShadow: `0px 3px 5px rgb(0, 0, 0, 0.2)`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'start',
    textAlign: 'left',
    alignItems: 'center',
    padding: 10,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    color: 'black',
    justifyContent: 'start',
    minHeight: '3rem',
    height: 'auto',
    '&:hover': {
        textDecoration: 'underline',
        color: theme.palette.secondary.dark
    }
}));

export const StateContainer = styled('div')(({ theme }) => ({
    margin: 0,
    padding: 0,
    justifySelf: 'center',
    alignSelf: 'center',
    [theme.breakpoints.down('md')]: {
        justifySelf: 'end'
    }
}));

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: 'flex',
    alignSelf: 'end',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        gridColumnStart: 'span 2',
        '&:last-child': {
            justifySelf: 'start'
        },
    },
}));