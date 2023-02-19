import { useEffect } from 'react';
import { StyledPage } from './styles/styles'
import List from './components/List';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
import useStore from './store';

// To-do: 
// 1. Make Responsive - ✅
// 2. Find way to Add Routes/Lists with relationship to correct to-do's
// 3. Improve UX: checkbox, notes, onKeyDown, completed, Date Reminder, etc. 
// 4. Add testing
// 5. Deploy

const App = () => {
  const fetchData = useStore(state => state.fetch);
  const [cookies] = useCookies(['Email', 'AuthToken']);
  const userEmail: string = cookies.Email;
  const authToken: string = cookies.AuthToken;

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
          <List />
        }
      </StyledPage>
    </ThemeProvider>
  );
}

export default App;
