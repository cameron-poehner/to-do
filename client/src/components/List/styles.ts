import { styled } from '@mui/material/styles';

export const StyledList = styled('ul')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    marginTop: 100,
    borderRadius: '10px',
    boxShadow: '0px 3px 5px rgb(0, 0, 0, 0.2)',
    width: '70%',
    fontWeight: 300,
    listStyle: 'none',
}))