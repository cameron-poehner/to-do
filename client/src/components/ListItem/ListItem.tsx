import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { StyledListItem, StyledButtonContainer } from './styles';

const ListItem: React.FC<any> = (props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const editTodo = () => {
        console.log('Editing to-do');
        setShowModal(true);
    }

    const deleteTodo = () => {
        console.log('deleting to-do');
    }
    return (
        <StyledListItem>
            <p>{props.task.title}</p>
            <StyledButtonContainer>
                <Button title={"EDIT"} onClick={editTodo} />
                <Button title={"DELETE"} onClick={deleteTodo} />
            </StyledButtonContainer>
            {showModal && <Modal mode='edit' setShowModal={setShowModal} task={props.task} getData={props.getData} />}
        </StyledListItem>
    )
}

export default ListItem;