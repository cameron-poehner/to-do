import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    margin: 0,
    padding: 0,
}))

export const StyledButton = styled(Button, {
    // Configure which props should be forwarded on DOM
    shouldForwardProp: (prop) => prop !== 'variant'

})
    (({ theme, variant }) => ({
        margin: '5px 0px 5px 0px',
        backgroundColor: variant === 'contained' ? theme.palette.secondary.dark : 'none',
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: variant === 'contained' ? theme.palette.text.primary : theme.palette.secondary.dark,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: variant === 'contained' ? '' : '12px',
        }
    }))