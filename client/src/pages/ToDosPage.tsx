import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme, StyledPage, StyledPageContainer } from '../styles/styles';
import Navbar from '../components/Navbar';
import List from '../components/List';
import useStore from '../store';
import { useCookies } from 'react-cookie';


const ToDosPage = (props: any) => {
    const toDos = useStore(state => state.toDos);
    const toDoListId = useStore(state => state.listId);
    const fetchToDoList = useStore(state => state.fetchToDos);
    const [cookies, setCookie, removeCookie] = useCookies();
    console.log('list id', toDoListId);
    console.log('email', cookies.Email);
    useEffect(() => {
        if (toDoListId) {
            fetchToDoList(toDoListId, cookies.Email)
        }
    }, [fetchToDoList, toDoListId, cookies.Email])

    console.log('todos', toDos);

    return (
        <StyledPageContainer>
            <List list={toDos} />
        </StyledPageContainer>
    )
};

export default ToDosPage;