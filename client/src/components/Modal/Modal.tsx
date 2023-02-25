import { useState, SyntheticEvent } from 'react';
import {
    StyledOverlay,
    StyledModal,
    StyledFormTitleContainer,
    StyledForm,
    StyledCloseButton,
} from './styles';
import Button from '../Button';
import { TextField, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCookies } from 'react-cookie';
import useStore, { toDo } from '../../store';

interface ModalProps {
    task: any
    setShowModal?: any
}

const Modal: React.FC<ModalProps> = ({ task, setShowModal }) => {
    const fetchData = useStore(state => state.fetchToDos);
    const listId = useStore(state => state.listId);
    const mode = useStore(state => state.mode);
    const [cookies] = useCookies();
    const editMode = mode === 'edit' ? true : false;

    console.log('Modal Task', task);


    const [data, setData] = useState<any>({
        user_email: editMode ? task?.user_email : cookies.Email,
        title: editMode ? task?.title : '',
        completed: editMode ? true : false,
        date: editMode ? task?.date : new Date(),
        notes: editMode ? task?.notes : 'test-notes',
        list_id: editMode ? task?.list_id : listId,
    })

    const postData = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            fetchData(listId, cookies.Email);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }

    const editData = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            fetchData(listId, cookies.Email);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const { name, value } = event.target;
        setData((data: toDo) => ({
            ...data,
            [name]: value
        }))
    }

    const handleClick = (event: SyntheticEvent) => {
        setShowModal(false);
    }

    const stopProp = (event: any) => {
        event.stopPropagation();
    }

    return (
        <StyledOverlay onClick={handleClick}>
            <StyledModal onClick={stopProp}>
                <StyledFormTitleContainer>
                    <h3>Let's {mode} your task!</h3>
                    <StyledCloseButton variant='text' onClick={handleClick}><CloseIcon sx={{ color: 'black' }} /></StyledCloseButton>
                </StyledFormTitleContainer>
                <StyledForm>
                    <InputLabel htmlFor='title'></InputLabel>
                    <TextField
                        required
                        placeholder='Your task goes here'
                        name='title'
                        value={data.title}
                        onChange={handleChange}
                        variant='standard'
                        id='title'
                    />
                    <Button variant='contained' title='SUBMIT' onClick={editMode ? editData : postData} />
                </StyledForm>
            </StyledModal>
        </StyledOverlay>
    );
};

export default Modal;