import { StyledPage } from './styles/styles'
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
import useStore from './store';
import Home from './components/Home';

// To-do: 
// 1. Fix Routing/Navbar issues
// 2. Refactor List/Modal/ListHeader/ListItem component to adapt to List vs. Todo behaviors
// 3. Improve UX: checkbox, notes, onKeyDown, completed, Date Reminder, etc. 
// 4. Add testing
// 5. Deploy

const App = () => {
  const [cookies] = useCookies(['Email', 'AuthToken']);
  const authToken: string = cookies.AuthToken;

  return (
    <>
      {!authToken && <Auth />}
      {authToken &&
        <Home />
      }
    </>
  );
}

export default App;
