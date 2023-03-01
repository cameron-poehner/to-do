import { styled } from '@mui/material/styles';

export const StyledContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(0 0 0 / 0.2)',
}));

export const StyledStatContainer = styled('span')(({ theme }) => ({
    display: 'flex',
    borderBottom: 'none'
}))