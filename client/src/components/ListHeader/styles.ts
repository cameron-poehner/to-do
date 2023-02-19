import { styled } from '@mui/material/styles';

export const StyledListHeader = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottom: '1px solid rgb(0 0 0 / 0.2)',
    '&>h1': {
        fontFamily: 'Arial',
        fontWeight: 400
    }
}))

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '18%',
    [theme.breakpoints.down('md')]: {
        width: '80%',
    }

}))