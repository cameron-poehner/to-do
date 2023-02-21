import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { StyledListItem, StyledButtonContainer, StyledLink } from './styles';
import useStore from '../../store';
import { useCookies } from 'react-cookie';

interface ListItemProps {
    task: any
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
    const [showModal, setShowModal] = useState(false);
    const fetchData = useStore(state => state.fetchToDos);
    const setMode = useStore(state => state.setMode);
    const setListId = useStore(state => state.setListId);
    const [cookies] = useCookies();
    const view = 'list';

    const editTodo = () => {
        setMode('edit');
        setShowModal(true);
        console.log('Task', task);
    }

    const handleClick = (event: any) => {
        // event.preventDefault();
        setListId(task.id);
    }

    console.log('task', task);

    const deleteTodo = async () => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: 'DELETE',
            });
            // fetchData(cookies.Email);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <StyledListItem>
            {view === 'list'
                ? <StyledLink to={`/lists/${task.id}`}>
                    <Button variant='text' onClick={handleClick} title={task.title} />
                </StyledLink>
                : <p>{task.title}</p>
            }
            <StyledButtonContainer>
                <Button variant='contained' title={"EDIT"} onClick={editTodo} />
                <Button variant='contained' title={"DELETE"} onClick={deleteTodo} />
            </StyledButtonContainer>
            {showModal && <Modal task={task} setShowModal={setShowModal} />}
        </StyledListItem>
    )
}

export default ListItem;