import React, { useEffect, useState } from 'react';
import { StyledPage } from './styles/styles'
// import Auth from './components/Auth';
import List from './components/List';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/styles';

const App = () => {
  const [tasks, setTasks] = useState<any[] | null>(null);

  const getData = async () => {
    const userEmail = 'cam@test.com';

    try {
      const res = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await res.json();
      setTasks(json);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log('Tasks', tasks);

  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <List list={tasks} />
      </StyledPage>
    </ThemeProvider>
  );
}

export default App;
