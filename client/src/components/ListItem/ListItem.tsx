import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { StyledListItem, StyledButtonContainer } from './styles';
import useStore from '../../store';
import { Checkbox } from '@mui/material';
import { eventNames } from 'process';

// To-do: 
// 1. Figure out how to mark checkbox as checked if completed = true && allow user to update
// 2. Add section to show notes on existing To-do/s
// 3. Clean up styles - title needs to be left aligned (grouped w/checkbox) && need to figure out what to do with Notes
//      Make completed slightly greyed out?? 
// 4. Make Responsive
// 5. Clean up code && update types


interface ListItemProps {
    task: any
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
    const [showModal, setShowModal] = useState(false);
    const setMode = useStore(state => state.setMode);
    const fetchToDoList = useStore(state => state.fetchToDos);

    const editTodo = () => {
        setMode('edit');
        setShowModal(true);
    }

    const deleteTodo = async () => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            setShowModal(false);
            fetchToDoList(task.list_id, task.user_email);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCompleted = async (event: any) => {
        console.log('event', event);
        const body = {
            user_email: task.user_email,
            title: task.title,
            completed: !task.completed,
            date: task.date,
            notes: task.notes,
            list_id: task.list_id,
        }
        try {
            const test = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            console.log('test', test);
            fetchToDoList(task.list_id, task.user_email);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <StyledListItem>
            <Checkbox checked={task.completed} onChange={handleCompleted} />
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