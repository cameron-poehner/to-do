import React, { useEffect, useState } from 'react';
import { StyledPage } from './styles/styles'
// import Auth from './components/Auth';
import List from './components/List';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [tasks, setTasks] = useState<any[] | null>(null);

  const authToken = false;

  const getData = async () => {
    const userEmail = 'cam@test.com';

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
      const json = await res.json();
      setTasks(json);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  console.log('Tasks', tasks);

  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        {!authToken && <Auth />}
        {authToken &&
          <>
            <List list={tasks} getData={getData} />
          </>
        }
      </StyledPage>
    </ThemeProvider>
  );
}

export default App;
