import React, { useEffect } from 'react';
import { StyledPageContainer } from '../styles/styles';
import { useCookies } from 'react-cookie';
import { useMatch } from 'react-router-dom';
import useStore from '../store';
import NoList from '../components/NoList';
import ListPageHeader from '../components/ListPageHeader';
import ListViewer from '../components/ListViewer';


const ListsPage = () => {
    const fetchLists = useStore(state => state.fetchLists);
    const [cookies] = useCookies(['Email', 'AuthToken', 'UserName']);
    const userEmail = cookies.Email;
    const userName = cookies.UserName;
    const toDoLists = useStore(state => state.lists);
    const render = useMatch('/lists');

    useEffect(() => {
        if (render?.pathname === '/lists') {
            fetchLists(userEmail);
        }
    }, [render, fetchLists, userEmail]);

    return (
        <StyledPageContainer>
            <ListPageHeader user={userName} />
            {toDoLists.length > 0
                ? <ListViewer lists={toDoLists} />
                : <NoList />}
        </StyledPageContainer>
    )
}

export default ListsPage;