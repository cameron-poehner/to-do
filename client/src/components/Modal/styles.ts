import { styled } from '@mui/material/styles';

export const StyledOverlay = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
}));

export const StyledModal = styled('div')(({ theme }) => ({
    width: '500px',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: 'rgb(0, 0, 0, 0.05) 0 6px 24px 0, rgb(0, 0, 0, 0,08) 0 0 0 1px',
}))

export const StyledFormTitleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

export const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}))