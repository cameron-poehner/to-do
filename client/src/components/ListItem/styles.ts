import { styled } from '@mui/material/styles';

export const StyledListItem = styled('li')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 0,
    marginTop: 10,
    marginRight: 0,
    borderRadius: '10px',
    boxShadow: `0px 3px 5px rgb(0, 0, 0, 0.2)`,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
}))

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '14%',
    padding: 0,
    margin: 0,
    marginRight: 10
}));