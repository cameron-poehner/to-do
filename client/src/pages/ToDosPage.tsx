import React, { useEffect } from 'react';
import { StyledPageContainer } from '../styles/styles';
import List from '../components/List';
import useStore from '../store';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

// To-do: 
// 1. Fix Editing order like lists
// 2. Add onKey handler for create/edit modal
// 3. Fix Delete Button
// 4. Create/update no to-do's scenario
// 5. Update List Item UI - Add Nots, and checkbox fields (This will include Modal updates)
// 6. Update responsive aspects
// 7. Update Types/cleanup logs


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