import React, { useState } from 'react';
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

const Modal: React.FC<any> = ({ mode, setShowModal, task, getData }) => {
    console.log('mode', mode);
    console.log('task', task);
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState<any>({
        user_email: editMode ? task.user_email : 'cam@test.com',
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : null,
        date: editMode ? task.date : new Date(),
    })

    const postData = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            console.log('POST Response', response);
            getData();
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }

    const editData = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            console.log('PUT Response', response);
            getData();
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
        console.log('data', data);
    }

    const handleSubmit = (event: any) => {
        console.log('Form Submitted');
    }

    const handleClick = (event: any) => {
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
                <StyledForm onSubmit={handleSubmit}>
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
                        value={data.progress || 0}
                        onChange={handleChange}
                    />
                    <Button type='submit' title='SUBMIT' onClick={editMode ? editData : postData} />
                </StyledForm>
            </StyledModal>
        </StyledOverlay>
    );
};

export default Modal;