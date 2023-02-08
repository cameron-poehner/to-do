import Button from '../Button';
import React from 'react';
import { StyledListItem, StyledButtonContainer } from './styles';

const ListItem: React.FC<any> = (props) => {

    const editTodo = () => {
        console.log('Editing to-do');
    }

    const deleteTodo = () => {
        console.log('deleting to-do');
    }
    return (
        <StyledListItem>
            <p>{props.task}</p>
            <StyledButtonContainer>
                <Button title={"EDIT"} onClick={editTodo} />
                <Button title={"DELETE"} onClick={deleteTodo} />
            </StyledButtonContainer>
        </StyledListItem>
    )
}

export default ListItem;