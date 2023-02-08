import { styled } from '@mui/material/styles';

export const StyledListHeader = styled('div')(({ theme }) => ({
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
    display: 'flex'
}))