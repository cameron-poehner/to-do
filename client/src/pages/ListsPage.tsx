import { ThemeProvider } from '@emotion/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyledPage, theme } from '../styles/styles';
import Navbar from '../components/Navbar';
import useStore from '../store';
import { useCookies } from 'react-cookie';
import List from '../components/List';
import NoList from '../components/NoList';

const ListsPage = () => {
    const fetchLists = useStore(state => state.fetchLists);
    const [cookies] = useCookies(['Email', 'AuthToken']);
    const userEmail: string = cookies.Email;
    const authToken: string = cookies.AuthToken;
    const toDoLists = useStore(state => state.lists);
    const test = false;

    console.log('lists', toDoLists);
    useEffect(() => {
        if (authToken) {
            fetchLists(userEmail);
        }
    }, [authToken, fetchLists, userEmail]);


    return (
        <>
            {test && <NoList />}
            {!test && <List list={toDoLists} />}
        </>
    )
}

export default ListsPage;