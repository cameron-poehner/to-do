import React, { useEffect } from 'react';
import { StyledPageContainer } from '../styles/styles';
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

    useEffect(() => {
        if (authToken) {
            fetchLists(userEmail);
        }
    }, [authToken, fetchLists, userEmail]);


    return (
        <StyledPageContainer>
            {test && <NoList />}
            {!test && <List list={toDoLists} />}
        </StyledPageContainer>
    )
}

export default ListsPage;