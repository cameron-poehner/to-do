import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledListHeader = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    marginTop: 100,
    borderRadius: '10px',
    boxShadow: '0px 3px 5px rgb(0, 0, 0, 0.2)',
    width: '70%',
    fontWeight: 300,
}))

export const StyledContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgb(0 0 0 / 0.2)',
    '&>h1': {
        fontFamily: 'Arial',
        fontWeight: 400
    }
}))

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    margin: 0,
    padding: 0,
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: '5px 15px 5px 0px',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    }
}))