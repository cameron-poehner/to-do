import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    margin: 0,
    padding: 0,
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: '5px 0px 5px 15px',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    }
}))