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

const Modal: React.FC<any> = ({ mode, setShowModal, task }) => {
    console.log('mode', mode);
    console.log('task', task);
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState<any>({
        user_email: editMode ? task.user_email : null,
        title: editMode ? task.title : null,
        notes: editMode ? task.notes : null,
        progress: editMode ? task.progress : null,
        date: editMode ? '' : new Date(),
    })

    const postData = () => {
        try {
            fetch(`http://localhost:8000`);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event: any) => {
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

    // const handleBlur = (event: any) => {
    //     console.log('event', event);
    //     setShowModal(false);
    // }

    return (
        <StyledOverlay>
            <StyledModal>
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
                        value={data.title}
                        onChange={handleChange}
                        variant='standard'
                        id='title'
                    />
                    <InputLabel htmlFor='notes'>Notes</InputLabel>
                    <TextField
                        placeholder='notes'
                        name='notes'
                        value={data.notes}
                        onChange={handleChange}
                        variant='outlined'
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
                    <Button type='submit' title='SUBMIT' onClick={handleClick} />
                </StyledForm>
            </StyledModal>
        </StyledOverlay>
    );
};

export default Modal;