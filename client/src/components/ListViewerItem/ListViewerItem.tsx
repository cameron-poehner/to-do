import React, { useState, useEffect, useCallback } from 'react';
import { StyledContainer, StyledLink, StyledButtonContainer, StateContainer } from './styles';
import Button from '../Button';
import { InputLabel, TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import useStore from '../../store';
import { get } from 'http';

const ListViewerItem: React.FC<any> = ({ list }) => {
    const fetchList = useStore(state => state.fetchList);
    const [cookies] = useCookies();
    const [editMode, setEditMode] = useState(false);
    const [listTitle, setListTitle] = useState(list.title);
    const fetchLists = useStore(state => state.fetchLists);
    const setListId = useStore(state => state.setListId);
    const [toDos, setToDos] = useState([]);

    const handleClick = () => {
        setListId(list.id);
    }

    const getListLength = useCallback(async () => {
        try {
            const test = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${list.id}/${cookies.Email}`)
                .then(res => res.json());
            setToDos(test);
            return test;
        } catch (err) {
            console.error(err);
        }
    }, [list.id, cookies.Email])

    useEffect(() => {
        if (listTitle !== list.title) {
            fetchList(list.id, cookies.Email);
        }
        getListLength();
        // setToDos(test);
    }, [listTitle, list.title, fetchList, cookies.Email, list.id, getListLength]);

    console.log('todos', toDos);

    const handleEdit = async (event: any) => {
        editMode ? setEditMode(false) : setEditMode(true);
        if (editMode) {
            const body = {
                title: listTitle,
                user_email: cookies.Email,
                date: list.date
            }
            try {
                await fetch(`${process.env.REACT_APP_SERVER_URL}/lists/${list.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })
                fetchLists(cookies.Email);
                setEditMode(false);
            } catch (err) {
                console.error(err);
            }
        } else {
            return;
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/lists/${list.id}/${cookies.Email}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('res', res);
            fetchLists(cookies.Email);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event: any) => {
        event.preventDefault();
        setListTitle(event.target.value);
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {

            const body = {
                title: listTitle,
                user_email: cookies.Email,
                date: list.date
            }
            try {
                fetch(`${process.env.REACT_APP_SERVER_URL}/lists/${list.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                fetchList(list.id, cookies.Email);
                setEditMode(false);
            } catch (err) {
                console.error(err);
            }
        }
    }

    const handleBlur = (event: any) => {
        return !event.relatedTarget ? setEditMode(false) : null;
    }

    return (
        <StyledContainer>
            {editMode
                ? <form>
                    <InputLabel htmlFor='list-title'></InputLabel>
                    <TextField
                        autoFocus
                        value={listTitle}
                        name='list-title'
                        id='list-title'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />
                </form>
                : <StyledLink to={`/lists/${listTitle}`}>
                    <Button variant='text' onClick={handleClick} title={listTitle} />
                </StyledLink>
            }
            <StateContainer>{toDos.length}</StateContainer>
            <StyledButtonContainer>
                <Button tabIndex={1} variant='contained' onClick={handleEdit} title={editMode ? 'done' : 'edit'} />
                <Button variant='contained' onClick={handleDelete} title='delete' />
            </StyledButtonContainer>
        </StyledContainer>
    );
};

export default ListViewerItem;