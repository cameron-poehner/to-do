import { useState, SyntheticEvent, ChangeEvent, MouseEventHandler } from 'react';
import {
    StyledOverlay,
    StyledModal,
    StyledFormTitleContainer,
    StyledForm,
    StyledSlider,
    StyledCloseButton,
} from './styles';
import Button from '../Button';
import { TextField, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCookies } from 'react-cookie';
import useStore, { toDo } from '../../store';

interface ModalProps {
    task?: toDo
}

const Modal: React.FC<ModalProps> = ({ task }) => {
    const fetchData = useStore(state => state.fetch);
    const setShowModal = useStore(state => state.setShowModal);
    const mode = useStore(state => state.mode);
    const [cookies] = useCookies();
    const editMode = mode === 'edit' ? true : false;

    const [data, setData] = useState<toDo>({
        user_email: editMode ? task?.user_email : cookies?.Email,
        title: editMode ? task?.title : '',
        progress: editMode ? task?.progress : 0,
        date: editMode ? task?.date : new Date(),
    })

    const postData = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            fetchData(cookies.Email);
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
            fetchData(cookies.Email);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event: any) => {
        event.stopPropagation();
        const { name, value } = event.target;
        setData((data: any) => ({
            ...data,
            [name]: value
        }))
    }

    const handleClick = (event: SyntheticEvent) => {
        setShowModal(false);
    }

    const stopProp = (event: SyntheticEvent) => {
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
                        value={data.title || ''}
                        onChange={handleChange}
                        variant='standard'
                        id='title'
                    />
                    <InputLabel htmlFor='progress'>Progress</InputLabel>
                    <StyledSlider
                        min={0}
                        max={100}
                        step={10}
                        marks
                        name='progress'
                        id='progress'
                        value={data.progress}
                        onChange={handleChange}
                    />
                    <Button type='submit' title='SUBMIT' onClick={editMode ? editData : postData} />
                </StyledForm>
            </StyledModal>
        </StyledOverlay>
    );
};

export default Modal;