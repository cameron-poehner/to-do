import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { StyledListItem, StyledButtonContainer } from './styles';
import useStore from '../../store';

interface ListItemProps {
    task: any
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
    const [showModal, setShowModal] = useState(false);
    const setMode = useStore(state => state.setMode);
    const setListId = useStore(state => state.setListId);

    const editTodo = () => {
        setMode('edit');
        setShowModal(true);
    }

    const handleClick = (event: any) => {
        setListId(task.id);
    }

    console.log('task', task);

    const deleteTodo = async () => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: 'DELETE',
            });
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <StyledListItem>
            <p>{task.title}</p>
            <StyledButtonContainer>
                <Button variant='contained' title={"EDIT"} onClick={editTodo} />
                <Button variant='contained' title={"DELETE"} onClick={deleteTodo} />
            </StyledButtonContainer>
            {showModal && <Modal task={task} setShowModal={setShowModal} />}
        </StyledListItem>
    )
}

export default ListItem;