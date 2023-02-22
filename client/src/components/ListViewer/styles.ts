import { styled } from '@mui/material/styles';

export const StyledListViewerContainer = styled('div')(({ theme }) => ({
    width: '80%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '10px',
    height: 'auto',
    placeContent: 'end'
}));
