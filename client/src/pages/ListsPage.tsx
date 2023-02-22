import React, { useEffect } from 'react';
import { StyledPageContainer } from '../styles/styles';
import useStore from '../store';
import { useCookies } from 'react-cookie';
import NoList from '../components/NoList';
import ListPageHeader from '../components/ListPageHeader';
import ListViewer from '../components/ListViewer';

const ListsPage = () => {
    const fetchLists = useStore(state => state.fetchLists);
    const [cookies] = useCookies(['Email', 'AuthToken']);
    const userEmail: string = cookies.Email;
    const authToken: string = cookies.AuthToken;
    const toDoLists = useStore(state => state.lists);
    const test = false;

    useEffect(() => {
        if (authToken) {
            fetchLists(userEmail);
        }
    }, [authToken, fetchLists, userEmail]);

    return (
        <StyledPageContainer>
            <ListPageHeader user={userEmail} />
            {test && <NoList />}
            <ListViewer lists={toDoLists} />
        </StyledPageContainer>
    )
}

export default ListsPage;