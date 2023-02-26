import React, { useEffect } from 'react';
import { StyledPageContainer } from '../styles/styles';
import List from '../components/List';
import useStore from '../store';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

// To-do: 
// 1. Server: Fix Editing order like lists/Clean Up Code
// 2. Implement Completed Query and related Component + logic for when to show (Button?)
// 3. Update Header: username && add New Button (event handlers, form inputs to match options)
// 4. Update List Items: Should have check box, disappear when completed, and show notes
// 5. Create component and implement logic to handle cases where no to-do's exist for current list
// 6. Triple Check Modal Form scenarios (editing/creating, input events(key down) refetching data scenarios)
// 7. Check Mobile Responsive Qualities
// 8. Add types and cleanup code



const ToDosPage = () => {
    const { list } = useParams();
    const toDos = useStore(state => state.toDos);
    const fetchToDoList = useStore(state => state.fetchToDos);
    const [cookies] = useCookies();
    console.log('list', list);

    useEffect(() => {
        if (list) {
            fetchToDoList(list, cookies.Email)
        }
    }, [fetchToDoList, list, cookies.Email])

    return (
        <StyledPageContainer>
            <List list={toDos} />
        </StyledPageContainer>
    )
};

export default ToDosPage;