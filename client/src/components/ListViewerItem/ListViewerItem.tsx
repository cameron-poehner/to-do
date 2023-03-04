import React, { useState, useEffect, useCallback, FocusEvent, MouseEvent, ChangeEvent, KeyboardEvent } from 'react';
import { StyledContainer, StyledLink, StyledButtonContainer, StateContainer } from './styles';
import Button from '../Button';
import { InputLabel, TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import useStore from '../../store';

interface ToDoList {
    completed: boolean
    date: Date
    id: string
    list_id: string
    notes: string
    title: string
    user_email: string
}

interface List {
    date: Date
    id: string
    title: string
    user_email: string
}

interface ListViewerItemProps {
    list: List
}

const ListViewerItem: React.FC<ListViewerItemProps> = ({ list }) => {
    const fetchList = useStore(state => state.fetchList);
    const [cookies] = useCookies();
    const [editMode, setEditMode] = useState(false);
    const [listTitle, setListTitle] = useState<string>(list.title);
    const fetchLists = useStore(state => state.fetchLists);
    const setListId = useStore(state => state.setListId);
    // const setListName = useStore(state => state.setListTitle);
    const [toDos, setToDos] = useState<List[]>([]);

    const handleClick = () => {
        setListId(list.id);
        // setListName(list.title);
    }

    const getListLength = useCallback(async (): Promise<ToDoList[] | undefined> => {
        try {
            const toDoList = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${list.id}/${cookies.Email}`)
                .then(res => res.json());
            setToDos(toDoList);
            return toDoList;
        } catch (err) {
            console.error(err);
        }
    }, [list.id, cookies.Email]);

    useEffect(() => {
        if (listTitle !== list.title) {
            fetchList(list.id, cookies.Email);
        }
        getListLength();
    }, [listTitle, list.title, fetchList, cookies.Email, list.id, getListLength]);

    const handleEdit = async (event: MouseEvent) => {
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
            await fetch(`${process.env.REACT_APP_SERVER_URL}/lists/${list.id}/${cookies.Email}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            fetchLists(cookies.Email);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setListTitle(event.target.value);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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

    const handleBlur = (event: FocusEvent) => {
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
                : <StyledLink to={`/lists/${list.id}`}>
                    <Button style={{ justifyContent: 'flex-start', textAlign: 'left', margin: 0, padding: 0 }} variant='text' onClick={handleClick} title={listTitle} />
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