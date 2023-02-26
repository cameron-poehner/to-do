import { StyledPageContainer } from './styles/styles'
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
import Home from './components/Home';

// To-do: 
// 1. Refactor List/Modal/ListHeader/ListItem component to adapt to List vs. Todo behaviors
// 2. Improve UX: checkbox, notes, onKeyDown, completed 
// 3. Fix Home Page && No List / No To-do components
// 4. Check Responsiveness
// 5. Add testing
// 6. Deploy

const App = () => {
  const [cookies] = useCookies(['Email', 'AuthToken']);
  const authToken: string = cookies.AuthToken;

  return (
    <StyledPageContainer>
      {!authToken && <Auth />}
      {authToken &&
        <Home />
      }
    </StyledPageContainer>
  );
}

export default App;
