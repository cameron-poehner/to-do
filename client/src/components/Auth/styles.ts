import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledAuthContainer = styled('div')(({ theme }) => ({
    margin: 0,
    marginTop: 100,
    padding: 0,
    width: '50vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center'
}));

export const StyledFormContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: '2rem',
    paddingBottom: '2rem',
    width: '30vw',
    minHeight: '30vh',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 3px 5px rgb(0, 0, 0, 0.2)',
    backgroundColor: theme.palette.primary.main,
}));

export const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '20rem',
    margin: 5,
    marginLeft: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    '& .Mui-focused': {
        transition: 'width .5s, height .5s, background-color .5s, transform .5s',
        backgroundColor: theme.palette.secondary.dark,
        borderBottomSize: '10px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.primary.dark,
        borderRadius: '5px',
        textAlign: 'center',
    },
}));

export const StyledAuthOptions = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '40%'
}));