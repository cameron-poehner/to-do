import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { StyledListItem, StyledButtonContainer } from './styles';
import useStore from '../../store';
import { useCookies } from 'react-cookie';

interface ListItemProps {
    task: any
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
    const [showModal, setShowModal] = useState(false);
    const fetchData = useStore(state => state.fetch);
    const setMode = useStore(state => state.setMode);
    const [cookies] = useCookies();

    const editTodo = () => {
        setMode('edit');
        setShowModal(true);
        console.log('Task', task);
    }

    const deleteTodo = async () => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: 'DELETE',
            });
            fetchData(cookies.Email);
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