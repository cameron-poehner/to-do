import Button from '../Button';
import Modal from '../Modal';
import { StyledListItem, StyledButtonContainer } from './styles';
import useStore, { toDo } from '../../store';
import { useCookies } from 'react-cookie';

interface ListItemProps {
    task: toDo
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
    const fetchData = useStore(state => state.fetch);
    const showModal = useStore(state => state.showModal);
    const setShowModal = useStore(state => state.setShowModal);
    const setMode = useStore(state => state.setMode);
    const [cookies] = useCookies();

    const editTodo = () => {
        setShowModal(true);
        setMode('edit');
        fetchData(cookies.Email);
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
                <Button title={"EDIT"} onClick={editTodo} />
                <Button title={"DELETE"} onClick={deleteTodo} />
            </StyledButtonContainer>
            {showModal && <Modal task={task} />}
        </StyledListItem>
    )
}

export default ListItem;