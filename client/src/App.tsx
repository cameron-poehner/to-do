import { useEffect } from 'react';
import { StyledPage } from './styles/styles'
import List from './components/List';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
import useStore from './store';

// To-do: 
// 1. Implement Zustand for Global State Management - 
// 2. Add type definitions where necessary
// 3. Fix Signin/Login Modal + Add Form Validations
// 4. Find Way to Add Route
// 5. Make Responsive
// 6. Deploy
// 7. Add testing

const App = () => {
  const fetchData = useStore(state => state.fetch);
  const [cookies] = useCookies(['Email', 'AuthToken']);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  useEffect(() => {
    if (authToken) {
      fetchData(userEmail);
    }
  }, [authToken, fetchData, userEmail]);

  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        {!authToken && <Auth />}
        {authToken &&
          <>
            <List />
          </>
        }
      </StyledPage>
    </ThemeProvider>
  );
}

export default App;
