import React, { useEffect } from 'react';
import { StyledPageContainer } from '../styles/styles';
import List from '../components/List';
import useStore from '../store';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

// To-do: 
// 1. Fix List Title Persisting between re-renders
// 2. Verify List Header and Add New Modal are Responsive/Accessible
// 3. Update List Items: Should have check box, disappear when completed, and show notes
// 4. Update Edit Modal: onKeyDown Handle (for Enter Key), Check Routes and checkbox to mark as completed if 'edit' mode = true
// 5. Create component and implement logic to handle cases where no to-do's exist for current list
// 6. Triple Check Modal Form scenarios (editing/creating, input events(key down) refetching data scenarios)
// 7. Check Mobile Responsive Qualities
// 8. Add types and cleanup code



const ToDosPage = () => {
    const fetchCompletedToDos = useStore(state => state.fetchCompletedToDos);
    const fetchListTitle = useStore(state => state.fetchListTitle);
    const { list } = useParams();
    const fetchToDoList = useStore(state => state.fetchToDos);
    const [cookies] = useCookies();

    useEffect(() => {
        if (list) {
            fetchToDoList(list, cookies.Email);
            fetchCompletedToDos(list, cookies.Email);
            fetchListTitle(list);
        }
    }, [fetchToDoList, fetchCompletedToDos, fetchListTitle, list, cookies.Email])

    return (
        <StyledPageContainer>
            <List />
        </StyledPageContainer>
    )
};

export default ToDosPage;