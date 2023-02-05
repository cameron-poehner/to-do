import React from 'react';
import { StyledPage } from './styles/styles'
// import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
// import ListItem from './components/ListItem';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        {/* <Auth></Auth> */}
        <ListHeader listname={'New York Prep List'} />
        {/* <ListItem /> */}
      </StyledPage>
    </ThemeProvider>
  );
}

export default App;
