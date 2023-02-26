import React, { useState, SyntheticEvent, KeyboardEvent } from 'react';
import {
    StyledOverlay,
    StyledModal,
    StyledFormTitleContainer,
    StyledCloseButton,
    StyledForm,
} from './styles';
import { TextField, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button';
import { useCookies } from 'react-cookie';
import useStore from '../../store';

interface ListModalProps {
    setShowModal: (value: boolean) => void
}

const ListModal: React.FC<ListModalProps> = ({ setShowModal }) => {
    const [title, setTitle] = useState('');
    const [cookies] = useCookies();
    const fetchToDoLists = useStore(state => state.fetchLists);

    const createList = async (event: SyntheticEvent) => {
        event.preventDefault();

        const body = {
            title: title,
            user_email: cookies.Email,
            date: new Date(),
        }

        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/lists`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            fetchToDoLists(cookies.Email);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event: any) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const handleClick = () => {
        setShowModal(false);
    }

    const stopProp = (event: SyntheticEvent) => {
        event.stopPropagation();
    }

    const handleKeyDown = async (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const body = {
                title: title,
                user_email: cookies.Email,
                date: new Date(),
            }

            try {
                await fetch(`${process.env.REACT_APP_SERVER_URL}/lists`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                fetchToDoLists(cookies.Email);
                setShowModal(false);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <StyledOverlay onClick={handleClick}>
            <StyledModal onClick={stopProp}>
                <StyledFormTitleContainer>
                    <h3>Let's create your list!</h3>
                    <StyledCloseButton variant='text' onClick={handleClick}><CloseIcon sx={{ color: 'black' }} /></StyledCloseButton>
                </StyledFormTitleContainer>
                <StyledForm>
                    <InputLabel htmlFor='title'></InputLabel>
                    <TextField
                        required
                        placeholder='Your task goes here'
                        name='title'
                        value={title}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        variant='standard'
                        id='title'
                    />
                    <Button variant='contained' title='SUBMIT' onClick={createList} />
                </StyledForm>
            </StyledModal>
        </StyledOverlay>
    );
};

export default ListModal;